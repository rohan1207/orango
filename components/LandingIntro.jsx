"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { INTRO_COOKIE } from "@/lib/intro";

export default function LandingIntro() {
  const router = useRouter();
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const goHome = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.cookie = `${INTRO_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.push("/");
    router.refresh();
  };

  const syncProgress = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

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
          /* file may not be in public/ yet */
        }
      }
    };

    tryPlay();
  }, []);

  const pct = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-paper px-5">
      <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.36em] text-muted">
        Orango
      </p>

      <div className="relative w-full max-w-[860px] overflow-hidden rounded-[1.6rem] bg-ink shadow-[0_30px_80px_rgba(20,17,14,0.12)]">
        <video
          ref={videoRef}
          src="/landing.mp4"
          className="aspect-video max-h-[58vh] w-full bg-ink object-cover"
          playsInline
          autoPlay
          preload="auto"
          onTimeUpdate={syncProgress}
          onLoadedMetadata={syncProgress}
          onEnded={goHome}
        />
      </div>

      <div className="mt-8 w-full max-w-[860px]">
        <div className="h-px w-full bg-ink/10">
          <div
            className="h-px bg-orange transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
          <span>Loading</span>
          <span>{pct}%</span>
        </div>
      </div>
    </main>
  );
}
