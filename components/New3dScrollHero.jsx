"use client";

/**
 * Scroll-scrubbed frame hero — sticky track (no GSAP pin).
 * Desktop: /frames/desktop_frames · Phone: /frames/mobile_frames (200 frames)
 *
 * Progress is driven by raw scroll math (reliable mid-track on iOS).
 * Displayed frame uses delta-time exponential smooth — butter on slow scroll,
 * capped catch-up on fling (no hang / no jump-cut).
 *
 * Phone: canvas uses touch-pan-y so the sticky stage scrolls the track
 * (touch-action:none previously trapped touch → frames only at edges).
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Preloader from "./Preloader";
import {
  FOLDER_DESKTOP,
  MOBILE_BREAKPOINT,
  TOTAL_FRAMES,
  drawFrame,
  folderFromWidth,
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
  const maxStep = abs > 40 ? 10 : abs > 20 ? 7 : abs > 8 ? 4 : Infinity;
  const step = delta * t;
  if (Math.abs(step) > maxStep) {
    return current + Math.sign(delta) * maxStep;
  }
  return current + step;
}

export default function New3dScrollHero() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const framesRef = useRef([]);
  const folderRef = useRef(FOLDER_DESKTOP);
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

  const [loadRatio, setLoadRatio] = useState(0);
  const [ready, setReady] = useState(false);
  /** Once true, preloader never comes back (fixes micro-flash on fast scroll). */
  const [loaderGone, setLoaderGone] = useState(false);

  const unlock = () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    setReady(true);
    window.setTimeout(() => setLoaderGone(true), 480);
  };

  const bindSession = (folder) => {
    folderRef.current = folder;
    const session = preloadFrames(folder, { aggressive: true });
    framesRef.current = session.frames;
    if (unsubRef.current) unsubRef.current();

    let progressT = 0;
    unsubRef.current = session.subscribe(({ ratio, ready: isReady }) => {
      dirtyRef.current = true;
      if (isReady || session.loaded >= 12) unlock();
      if (!unlockedRef.current) {
        window.clearTimeout(progressT);
        progressT = window.setTimeout(() => setLoadRatio(ratio), 80);
      }
    });

    if (session.ready || session.loaded >= 12) unlock();
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
    bindSession(folderFromWidth(window.innerWidth));

    const failSafe = window.setTimeout(unlock, 3200);
    return () => {
      window.clearTimeout(failSafe);
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

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
      /* swallow draw errors — never trip Next error boundary */
    }
  };

  useLayoutEffect(() => {
    if (!ready) return;
    sizeCanvas();
    paint(displayedRef.current);
  }, [ready]);

  // rAF loop: delta-time exponential smooth — clean on slow + fast scroll
  useEffect(() => {
    let raf = 0;
    let alive = true;
    lastTsRef.current = 0;

    const tick = (ts) => {
      if (!alive) return;
      try {
        const last = lastTsRef.current || ts;
        const dt = Math.min(0.048, Math.max(0.001, (ts - last) / 1000));
        lastTsRef.current = ts;

        const target = targetRef.current;
        const current = displayedRef.current;
        const slow = isMobileRef.current ? 14 : 11;
        const fast = isMobileRef.current ? 22 : 18;
        const next = smoothToward(current, target, dt, slow, fast);
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

  // Sticky track progress — continuous across full hero height on phone + desktop
  useLayoutEffect(() => {
    if (!ready || !trackRef.current) return undefined;

    const track = trackRef.current;

    const syncFromScroll = () => {
      try {
        const total = Math.max(1, track.offsetHeight - window.innerHeight);
        const top = track.getBoundingClientRect().top;
        const scrolled = Math.min(total, Math.max(0, -top));
        const p = scrolled / total;
        targetRef.current = p * (TOTAL_FRAMES - 1);
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
          const nextFolder = folderFromWidth(window.innerWidth);
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
      {!loaderGone ? (
        <Preloader progress={loadRatio} ready={ready} />
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
