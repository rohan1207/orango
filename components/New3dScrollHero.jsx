"use client";

/**
 * Scroll-locked GSAP frame-sequence hero.
 * Desktop: public/frames/desktop/…
 * Phone:   public/frames/mobile/…
 * Visual only — no overlay copy or buttons.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import {
  FRAME_LERP,
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
  const pinRef = useRef(null);
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
  const triggerRef = useRef(null);
  const modeRef = useRef("cover");

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const bindSession = (folder) => {
    folderRef.current = folder;
    // Reuse landing session if already warm — no second download
    const session = preloadFrames(folder, { aggressive: false });
    framesRef.current = session.frames;
    if (unsubRef.current) unsubRef.current();
    unsubRef.current = session.subscribe(({ ratio, ready: isReady }) => {
      setProgress(ratio);
      if (isReady) setReady(true);
      dirtyRef.current = true;
    });
    // Instant unlock when landing already filled enough frames
    if (session.ready || session.loaded >= 8) setReady(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    bindSession(folderFromWidth(window.innerWidth));

    return () => {
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 4000);
    return () => window.clearTimeout(t);
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
    const canvas = canvasRef.current;
    const pin = pinRef.current;
    if (!canvas || !pin) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = pin.clientWidth || window.innerWidth;
    const h = pin.clientHeight || window.innerHeight;
    sizeRef.current = { w, h };
    modeRef.current = w < MOBILE_BREAKPOINT ? "contain" : "cover";
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctxRef.current = ctx;
    }
    dirtyRef.current = true;
  };

  const paint = (frameIndex) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const { w, h } = sizeRef.current;
    const img = nearestLoaded(framesRef.current, frameIndex);
    drawFrame(ctx, img, w, h, modeRef.current);
    lastPaintedRef.current = Math.round(frameIndex);
    dirtyRef.current = false;
  };

  useLayoutEffect(() => {
    if (!ready) return;
    sizeCanvas();
    paint(0);
  }, [ready]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const target = targetRef.current;
      const current = displayedRef.current;
      const delta = target - current;
      const next =
        Math.abs(delta) < 0.08 ? target : current + delta * FRAME_LERP;
      displayedRef.current = next;
      const rounded = Math.round(next);
      if (dirtyRef.current || rounded !== lastPaintedRef.current) {
        paint(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    if (!ready || !pinRef.current) return undefined;

    const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT;
    const scrollLength = window.innerHeight * (isDesktop ? 4.2 : 3.2);

    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      pin: true,
      scrub: SCRUB,
      anticipatePin: 1,
      fastScrollEnd: true,
      preventOverlaps: true,
      onUpdate: (self) => {
        targetRef.current = self.progress * (TOTAL_FRAMES - 1);
      },
    });
    triggerRef.current = trigger;
    requestAnimationFrame(() => ScrollTrigger.refresh());

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const nextFolder = folderFromWidth(window.innerWidth);
        if (nextFolder !== folderRef.current) {
          bindSession(nextFolder);
        }
        sizeCanvas();
        paint(displayedRef.current);
        ScrollTrigger.refresh();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      trigger.kill();
      triggerRef.current = null;
    };
  }, [ready]);

  return (
    <>
      <Preloader progress={progress} ready={ready} />
      <section
        className="relative w-full bg-[#FFFAF6]"
        aria-label="OranGo product sequence"
      >
        <div
          ref={pinRef}
          id="home-scroll-hero"
          className="relative h-dvh w-full overflow-hidden bg-[#FFFAF6]"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
            aria-hidden
          />
        </div>
      </section>
    </>
  );
}
