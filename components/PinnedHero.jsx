"use client";

// Kept in the codebase for the frames-based pinned hero. Not mounted on the home page.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import {
  FRAME_LERP,
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

export default function PinnedHero() {
  const trackRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const folderRef = useRef(null);
  const framesRef = useRef([]);
  const targetRef = useRef(0);
  const displayedRef = useRef(0);
  const sizeRef = useRef({ w: 1, h: 1 });
  const triggerRef = useRef(null);
  const lastPaintedRef = useRef(-1);
  const dirtyRef = useRef(true);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const folder = folderFromWidth(window.innerWidth);
    folderRef.current = folder;
    const session = preloadFrames(folder);
    framesRef.current = session.frames;

    const unsub = session.subscribe(({ ratio, ready: isReady }) => {
      setProgress(ratio);
      if (isReady) setReady(true);
      dirtyRef.current = true;
    });

    return unsub;
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
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    sizeRef.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dirtyRef.current = true;
  };

  const paint = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { w, h } = sizeRef.current;
    const folder = folderRef.current || "desktop";
    const mode = folder === "mobile" ? "contain" : "cover";
    const img = nearestLoaded(framesRef.current, frameIndex);
    drawFrame(ctx, img, w, h, mode);
    lastPaintedRef.current = Math.round(frameIndex);
    dirtyRef.current = false;
  };

  useLayoutEffect(() => {
    sizeCanvas();
    paint(0);
  }, [ready]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const target = targetRef.current;
      const current = displayedRef.current;
      const next = current + (target - current) * FRAME_LERP;
      displayedRef.current = Math.abs(next - target) < 0.02 ? target : next;
      const rounded = Math.round(displayedRef.current);
      if (dirtyRef.current || rounded !== lastPaintedRef.current) {
        paint(displayedRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    if (!ready || !trackRef.current) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: SCRUB,
      onUpdate: (self) => {
        targetRef.current = self.progress * (TOTAL_FRAMES - 1);
      },
    });
    triggerRef.current = trigger;
    ScrollTrigger.refresh();

    const onResize = () => {
      sizeCanvas();
      paint(displayedRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
      triggerRef.current = null;
    };
  }, [ready]);

  return (
    <>
      <Preloader progress={progress} ready={ready} />
      <section ref={trackRef} className="hero-track relative w-full bg-paper">
        <div
          ref={heroRef}
          className="sticky top-[var(--nav-h)] h-[calc(100dvh-var(--nav-h))] w-full bg-white"
        >
          <canvas ref={canvasRef} className="block h-full w-full" />
        </div>
      </section>
    </>
  );
}
