"use client";

/**
 * Scroll-scrubbed frame hero — sticky track (no GSAP pin).
 * Pass frameSet="home1" | "home3" | "home4" for separate folder sets (no conflict).
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Preloader from "./Preloader";
import {
  DEFAULT_FRAME_SET,
  MOBILE_BREAKPOINT,
  drawFrame,
  folderFromWidth,
  getFrameSet,
  maxContiguousLoaded,
  nearestLoaded,
  preloadFrames,
} from "@/lib/frames";

/** Exponential smooth toward target — butter on slow scroll, catches up on fling */
function smoothToward(current, target, dt, lambdaSlow, lambdaFast) {
  const delta = target - current;
  const abs = Math.abs(delta);
  if (abs < 0.02) return target;
  const lambda = abs > 12 ? lambdaFast : lambdaSlow;
  const t = 1 - Math.exp(-lambda * dt);
  const maxStep = abs > 40 ? 14 : abs > 20 ? 9 : abs > 8 ? 5 : Infinity;
  const step = delta * t;
  if (Math.abs(step) > maxStep) {
    return current + Math.sign(delta) * maxStep;
  }
  return current + step;
}

export default function New3dScrollHero({
  frameSet = DEFAULT_FRAME_SET,
  /** When true (or set.requireAll), page stays on preloader until 100% frames load */
  waitForAllFrames,
  /** Landing already warmed frames — no second full-screen preloader */
  skipPreloader = false,
}) {
  const set = getFrameSet(frameSet);
  const totalFrames = set.total;
  const waitForAll =
    waitForAllFrames != null ? Boolean(waitForAllFrames) : Boolean(set.requireAll);

  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const framesRef = useRef([]);
  const sessionRef = useRef(null);
  const folderRef = useRef(set.desktop);
  const unsubRef = useRef(null);
  const targetRef = useRef(0);
  const displayedRef = useRef(0);
  const sizeRef = useRef({ w: 1, h: 1 });
  const lastPaintedRef = useRef(-1);
  const dirtyRef = useRef(true);
  const modeRef = useRef("cover");
  const unlockedRef = useRef(false);
  const lastTsRef = useRef(0);
  const isMobileRef = useRef(false);
  const maxContigRef = useRef(0);
  const totalRef = useRef(totalFrames);
  const setIdRef = useRef(frameSet);
  const waitAllRef = useRef(waitForAll);
  const skipPreloaderRef = useRef(skipPreloader);

  const [loadRatio, setLoadRatio] = useState(0);
  const [ready, setReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(skipPreloader);

  totalRef.current = totalFrames;
  setIdRef.current = frameSet;
  waitAllRef.current = waitForAll;
  skipPreloaderRef.current = skipPreloader;

  const unlock = (instant = false) => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    setReady(true);
    if (instant || skipPreloaderRef.current) {
      setLoaderGone(true);
    } else {
      window.setTimeout(() => setLoaderGone(true), 420);
    }
  };

  const canUnlock = (session) => {
    if (!session) return false;
    const total = session.total || totalRef.current;
    const loaded = session.loaded || 0;
    const contig = session.maxContiguous ?? -1;
    const ratio = total ? loaded / total : 0;
    const readyRatio = session.readyRatio ?? 0.5;

    if (waitAllRef.current) {
      return (
        (loaded >= total && contig >= total - 1) || loaded >= total
      );
    }

    // Smooth entry: unlock once ~50% is contiguous / ready; rest keeps loading
    return (
      session.ready ||
      ratio >= readyRatio ||
      contig >= Math.floor(total * readyRatio) - 1 ||
      loaded >= total
    );
  };

  const bindSession = (folder) => {
    folderRef.current = folder;
    const session = preloadFrames(folder, { aggressive: true });
    sessionRef.current = session;
    framesRef.current = session.frames;
    if (session.total) totalRef.current = session.total;
    maxContigRef.current = Math.max(0, session.maxContiguous ?? 0);
    if (unsubRef.current) unsubRef.current();

    unsubRef.current = session.subscribe(
      ({ ratio, maxContiguous }) => {
        dirtyRef.current = true;
        if (typeof maxContiguous === "number" && maxContiguous >= 0) {
          maxContigRef.current = maxContiguous;
        } else {
          maxContigRef.current = Math.max(
            0,
            maxContiguousLoaded(session.frames),
          );
        }
        // Keep total in sync with the live session (112)
        if (session.total) totalRef.current = session.total;
        setLoadRatio(ratio);
        if (canUnlock(session)) unlock(skipPreloaderRef.current);
      },
    );

    if (canUnlock(session)) unlock(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
    isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT;
    unlockedRef.current = false;
    setReady(false);
    setLoaderGone(skipPreloader);
    setLoadRatio(0);
    bindSession(folderFromWidth(window.innerWidth, frameSet));

    // Full-load pages: long failsafe only if still incomplete (broken network)
    const failMs = waitForAll ? 90000 : 14000;
    const failSafe = window.setTimeout(() => {
      const session = sessionRef.current;
      if (waitAllRef.current) {
        // Only bail if we already have a usable contiguous run
        if (
          session &&
          session.loaded >= Math.floor(session.total * 0.92)
        ) {
          unlock(skipPreloaderRef.current);
        }
        return;
      }
      unlock(skipPreloaderRef.current);
    }, failMs);

    return () => {
      window.clearTimeout(failSafe);
      if (unsubRef.current) unsubRef.current();
    };
    // frameSet is fixed per page mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameSet, waitForAll, skipPreloader]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const html = document.documentElement;
    if (!ready) {
      html.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      html.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
    };
  }, [ready]);

  const sizeCanvas = () => {
    try {
      const canvas = canvasRef.current;
      const stage = stageRef.current;
      if (!canvas || !stage || !canvas.isConnected) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, stage.clientWidth || window.innerWidth);
      const h = Math.max(1, stage.clientHeight || window.innerHeight);
      sizeRef.current = { w, h };
      isMobileRef.current = w < MOBILE_BREAKPOINT;
      modeRef.current = isMobileRef.current ? "contain" : "cover";
      const tw = Math.round(w * dpr);
      const th = Math.round(h * dpr);
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        const ctx = canvas.getContext("2d", {
          alpha: false,
          desynchronized: true,
        });
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "medium";
          ctxRef.current = ctx;
        }
      }
      dirtyRef.current = true;
    } catch {
      /* never crash scroll path */
    }
  };

  const paint = (frameIndex) => {
    try {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas?.isConnected || !ctx) return;
      const { w, h } = sizeRef.current;
      if (w < 2 || h < 2) return;
      const img = nearestLoaded(framesRef.current, frameIndex);
      drawFrame(ctx, img, w, h, modeRef.current);
      lastPaintedRef.current = Math.round(frameIndex);
      dirtyRef.current = false;
    } catch {
      /* swallow */
    }
  };

  useLayoutEffect(() => {
    if (!ready) return;
    sizeCanvas();
    paint(displayedRef.current);
  }, [ready]);

  useEffect(() => {
    let raf = 0;
    let alive = true;
    lastTsRef.current = 0;
    let boostTick = 0;

    const tick = (ts) => {
      if (!alive) return;
      try {
        const prevTs = lastTsRef.current || ts;
        const dt = Math.min(0.048, Math.max(0.001, (ts - prevTs) / 1000));
        lastTsRef.current = ts;

        // Full range 0 .. total-1 — never freeze mid-sequence on contig holes
        const lastFrame = Math.max(0, (totalRef.current || 1) - 1);
        const cappedTarget = Math.min(
          Math.max(0, targetRef.current),
          lastFrame,
        );

        const current = displayedRef.current;
        const slow = isMobileRef.current ? 16 : 13;
        const fast = isMobileRef.current ? 26 : 22;
        const next = smoothToward(current, cappedTarget, dt, slow, fast);
        displayedRef.current = next;

        const rounded = Math.round(next);
        if (dirtyRef.current || rounded !== lastPaintedRef.current) {
          paint(next);
        }

        boostTick += 1;
        if (boostTick % 8 === 0) {
          sessionRef.current?.boostAround?.(next, 32);
        }
      } catch {
        /* ignore */
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  useLayoutEffect(() => {
    if (!ready || !trackRef.current) return undefined;

    const track = trackRef.current;

    const syncFromScroll = () => {
      try {
        const totalScroll = Math.max(
          1,
          track.offsetHeight - window.innerHeight,
        );
        const top = track.getBoundingClientRect().top;
        const scrolled = Math.min(totalScroll, Math.max(0, -top));
        const p = Math.min(1, Math.max(0, scrolled / totalScroll));
        const frameCount = Math.max(1, totalRef.current);
        // Map scroll 0→1 across ALL frames (0 .. frameCount-1)
        targetRef.current = p * (frameCount - 1);
        sessionRef.current?.boostAround?.(targetRef.current, 40);
        dirtyRef.current = true;
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("scroll", syncFromScroll, { passive: true });
    syncFromScroll();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        try {
          const nextFolder = folderFromWidth(
            window.innerWidth,
            setIdRef.current,
          );
          if (nextFolder !== folderRef.current) {
            bindSession(nextFolder);
          }
          sizeCanvas();
          paint(displayedRef.current);
          syncFromScroll();
        } catch {
          /* ignore */
        }
      }, 160);
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [ready]);

  return (
    <>
      {!skipPreloader && !loaderGone ? (
        <Preloader
          progress={loadRatio}
          ready={ready}
          message={
            waitForAll
              ? "Loading all frames for a smooth scroll…"
              : "Preparing a smooth scroll experience…"
          }
        />
      ) : null}

      <section
        ref={trackRef}
        className="hero-frame-track relative w-full bg-[#FFFAF6]"
        aria-label="OranGo product sequence"
      >
        <div
          ref={stageRef}
          id="home-scroll-hero"
          className="sticky top-0 h-dvh w-full overflow-hidden bg-[#FFFAF6]"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full touch-pan-y"
            aria-hidden
          />
        </div>
      </section>
    </>
  );
}
