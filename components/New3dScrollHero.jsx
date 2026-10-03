"use client";

/**
 * Scroll-scrubbed frame hero — sticky track.
 * Smooth 1:1 scroll → frame mapping (no bounce / reverse jitter).
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Preloader from "./Preloader";
import {
  DEFAULT_FRAME_SET,
  MOBILE_BREAKPOINT,
  drawFrame,
  folderFromWidth,
  getFrameSet,
  nearestLoaded,
  preloadFrames,
} from "@/lib/frames";

/**
 * Critically-damped-ish follow: tracks scroll tightly, no max-step
 * clamping (that was causing forward→back→forward glitches).
 */
function smoothToward(current, target, dt) {
  const delta = target - current;
  if (Math.abs(delta) < 0.001) return target;
  // Higher lambda = snappier follow; still soft enough to feel elegant
  const lambda = 22;
  const t = 1 - Math.exp(-lambda * dt);
  return current + delta * t;
}

export default function New3dScrollHero({
  frameSet = DEFAULT_FRAME_SET,
  waitForAllFrames,
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
  const totalRef = useRef(totalFrames);
  const setIdRef = useRef(frameSet);
  const waitAllRef = useRef(waitForAll);
  const skipPreloaderRef = useRef(skipPreloader);
  const trackTopDocRef = useRef(0);
  const scrollRafRef = useRef(0);
  const allLoadedRef = useRef(false);

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
    if (waitAllRef.current) {
      return loaded >= total;
    }
    const ratio = total ? loaded / total : 0;
    const readyRatio = session.readyRatio ?? 0.5;
    return session.ready || ratio >= readyRatio || loaded >= total;
  };

  const bindSession = (folder) => {
    folderRef.current = folder;
    const session = preloadFrames(folder, { aggressive: true });
    sessionRef.current = session;
    framesRef.current = session.frames;
    if (session.total) totalRef.current = session.total;
    allLoadedRef.current =
      session.loaded >= session.total && session.total > 0;
    if (unsubRef.current) unsubRef.current();

    unsubRef.current = session.subscribe(({ ratio, loaded, total }) => {
      dirtyRef.current = true;
      if (session.total) totalRef.current = session.total;
      allLoadedRef.current = total > 0 && loaded >= total;
      setLoadRatio(ratio);
      if (canUnlock(session)) unlock(skipPreloaderRef.current);
    });

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

    const failMs = waitForAll ? 90000 : 14000;
    const failSafe = window.setTimeout(() => {
      const session = sessionRef.current;
      if (waitAllRef.current) {
        if (session && session.loaded >= Math.floor(session.total * 0.98)) {
          unlock(skipPreloaderRef.current);
        }
        return;
      }
      unlock(skipPreloaderRef.current);
    }, failMs);

    return () => {
      window.clearTimeout(failSafe);
      if (unsubRef.current) unsubRef.current();
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
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
          ctx.imageSmoothingQuality = "high";
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
      const frames = framesRef.current;
      const idx = Math.round(
        Math.min(Math.max(0, frameIndex), Math.max(0, frames.length - 1)),
      );
      // Prefer exact frame when fully loaded — avoids nearestLoaded jumps
      const img =
        (allLoadedRef.current && frames[idx]) ||
        nearestLoaded(frames, frameIndex);
      drawFrame(ctx, img, w, h, modeRef.current);
      lastPaintedRef.current = idx;
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

    const tick = (ts) => {
      if (!alive) return;
      try {
        const prevTs = lastTsRef.current || ts;
        const dt = Math.min(0.05, Math.max(0.001, (ts - prevTs) / 1000));
        lastTsRef.current = ts;

        const lastFrame = Math.max(0, (totalRef.current || 1) - 1);
        const target = Math.min(Math.max(0, targetRef.current), lastFrame);
        const next = smoothToward(displayedRef.current, target, dt);
        displayedRef.current = next;

        const rounded = Math.round(next);
        if (dirtyRef.current || rounded !== lastPaintedRef.current) {
          paint(next);
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

    const measureTrack = () => {
      // Document Y of track top — stable vs sticky getBoundingClientRect jitter
      const scrollY = window.scrollY || window.pageYOffset || 0;
      trackTopDocRef.current = track.getBoundingClientRect().top + scrollY;
    };

    const computeProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight || 1;
      const totalScroll = Math.max(1, track.offsetHeight - vh);
      const scrolled = Math.min(
        totalScroll,
        Math.max(0, scrollY - trackTopDocRef.current),
      );
      return scrolled / totalScroll;
    };

    const syncFromScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        try {
          const p = Math.min(1, Math.max(0, computeProgress()));
          const frameCount = Math.max(1, totalRef.current);
          targetRef.current = p * (frameCount - 1);
          dirtyRef.current = true;
        } catch {
          /* ignore */
        }
      });
    };

    measureTrack();
    syncFromScroll();

    window.addEventListener("scroll", syncFromScroll, { passive: true });

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
          measureTrack();
          sizeCanvas();
          paint(displayedRef.current);
          syncFromScroll();
        } catch {
          /* ignore */
        }
      }, 120);
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
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
