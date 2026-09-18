"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { preloadMachineAssets } from "@/lib/preloadMachine";

export default function LandingIntro() {
  const router = useRouter();
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const videoEndedRef = useRef(false);
  const modelReadyRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const tryGoHome = () => {
    if (doneRef.current) return;
    if (!videoEndedRef.current || !modelReadyRef.current) return;
    doneRef.current = true;
    router.push("/home");
  };

  const syncProgress = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const pct = (video.currentTime / video.duration) * 100;
    setProgress(Math.min(100, Math.max(0, pct)));
  };

  useEffect(() => {
    router.prefetch("/home");

    let cancelled = false;
    preloadMachineAssets()
      .then(() => {
        if (cancelled) return;
        modelReadyRef.current = true;
        tryGoHome();
      })
      .catch(() => {
        if (cancelled) return;
        modelReadyRef.current = true;
        tryGoHome();
      });

    const failSafe = window.setTimeout(() => {
      if (cancelled) return;
      modelReadyRef.current = true;
      tryGoHome();
    }, 25000);

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
    };
  }, [router]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = async () => {
      try {
        video.muted = false;
        await video.play();
      } catch {
        try {
          video.muted = true;
          await video.play();
        } catch {
          /* autoplay may be blocked */
        }
      }
    };

    tryPlay();
  }, []);

  const pct = Math.round(progress);

  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-8 overflow-hidden bg-white px-5">
      <div className="relative max-h-[70vh] max-w-[min(920px,92vw)] overflow-hidden bg-white [clip-path:inset(0)]">
        <video
          ref={videoRef}
          src="/video.mp4"
          className="block h-auto max-h-[70vh] w-auto max-w-full scale-[1.01] border-0 object-contain outline-none [transform:translateZ(0)]"
          playsInline
          autoPlay
          preload="auto"
          onTimeUpdate={syncProgress}
          onLoadedMetadata={syncProgress}
          onEnded={() => {
            setProgress(100);
            videoEndedRef.current = true;
            tryGoHome();
          }}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: "#fff",
          }}
        />
      </div>

      <div className="w-full max-w-[min(420px,88vw)]">
        <div className="relative h-1.5 rounded-full bg-[#EE6F28]/15">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[#EE6F28] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ease-linear"
            style={{ left: `${progress}%` }}
          >
            <Image
              src="/orange1.png"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 drop-shadow-[0_2px_6px_rgba(238,111,40,0.35)]"
              priority
            />
          </div>
        </div>
        <p className="mt-4 text-center text-[12px] font-semibold tracking-[0.2em] text-[#8B3410]/55">
          {pct}%
        </p>
      </div>
    </main>
  );
}
