"use client";

/**
 * Scroll-scrubbed frame hero — sticky track (no GSAP pin) for Vercel-stable fling scroll.
 * Desktop: /frames/desktop · Phone: /frames/mobile
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import {
  FRAME_LERP,
  MAX_FRAME_STEP,
  MOBILE_BREAKPOINT,
  SCRUB,
  TOTAL_FRAMES,
  drawFrame,
  folderFromWidth,
  nearestLoaded,
  preloadFrames,
} from "@/lib/frames";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function New3dScrollHero() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const framesRef = useRef([]);
  const folderRef = useRef("desktop");
  const unsubRef = useRef(null);
  const targetRef = useRef(0);
  const displayedRef = useRef(0);
  const sizeRef = useRef({ w: 1, h: 1 });
  const lastPaintedRef = useRef(-1);
  const dirtyRef = useRef(true);
  const modeRef = useRef("cover");
  const unlockedRef = useRef(false);
  const triggerRef = useRef(null);

  const [loadRatio, setLoadRatio] = useState(0);
  const [ready, setReady] = useState(false);
  /** Once true, preloader never comes back (fixes micro-flash on fast scroll). */
  const [loaderGone, setLoaderGone] = useState(false);

  const unlock = () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    setReady(true);
    // Fade out then unmount loader
    window.setTimeout(() => setLoaderGone(true), 500);
  };

  const bindSession = (folder) => {
    folderRef.current = folder;
    const session = preloadFrames(folder, { aggressive: false });
    framesRef.current = session.frames;
    if (unsubRef.current) unsubRef.current();

    let progressT = 0;
    unsubRef.current = session.subscribe(({ ratio, ready: isReady }) => {
      dirtyRef.current = true;
      if (isReady || session.loaded >= 8) unlock();
      // Throttle React progress updates — never on every decode during scrub
      if (!unlockedRef.current) {
        window.clearTimeout(progressT);
        progressT = window.setTimeout(() => setLoadRatio(ratio), 80);
      }
    });

    if (session.ready || session.loaded >= 8) unlock();
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
    bindSession(folderFromWidth(window.innerWidth));

    const failSafe = window.setTimeout(unlock, 3500);
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = Math.max(1, stage.clientWidth || window.innerWidth);
      const h = Math.max(1, stage.clientHeight || window.innerHeight);
      sizeRef.current = { w, h };
      modeRef.current = w < MOBILE_BREAKPOINT ? "contain" : "cover";
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
          ctx.imageSmoothingQuality = "low";
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

  // Single rAF loop: capped step so fast flings play through elegantly
  useEffect(() => {
    let raf = 0;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      try {
        const target = targetRef.current;
        let current = displayedRef.current;
        const delta = target - current;

        if (Math.abs(delta) >= MAX_FRAME_STEP) {
          // Fast scroll: advance a few frames per tick (play-through, no hang)
          current += Math.sign(delta) * MAX_FRAME_STEP;
        } else if (Math.abs(delta) > 0.05) {
          current += delta * FRAME_LERP;
        } else {
          current = target;
        }

        displayedRef.current = current;
        const rounded = Math.round(current);
        if (dirtyRef.current || rounded !== lastPaintedRef.current) {
          paint(current);
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

  // Sticky track + soft scrub (NO pin) — stable under wheel fling on Vercel
  useLayoutEffect(() => {
    if (!ready || !trackRef.current) return undefined;

    let trigger;
    try {
      trigger = ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: SCRUB,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Only write a number — never paint / setState here
          targetRef.current = self.progress * (TOTAL_FRAMES - 1);
        },
      });
      triggerRef.current = trigger;
    } catch {
      return undefined;
    }

    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        /* ignore */
      }
    });

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
          ScrollTrigger.refresh();
        } catch {
          /* ignore */
        }
      }, 180);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      try {
        trigger?.kill();
      } catch {
        /* ignore */
      }
      triggerRef.current = null;
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
            className="absolute inset-0 block h-full w-full touch-none"
            aria-hidden
          />
        </div>
      </section>
    </>
  );
}
