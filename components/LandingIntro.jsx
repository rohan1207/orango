"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PRIORITY_COUNT,
  folderFromWidth,
  injectFramePreloadLinks,
  warmupFramesFromLanding,
} from "@/lib/frames";

/**
 * Landing intro.
 * - Redirect as soon as the video ends (never waits on frames).
 * - While the video plays, aggressively preload + Cache API the device
 *   frame set so /home scroll hero is already warm.
 */
export default function LandingIntro() {
  const router = useRouter();
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const goHome = () => {
    if (doneRef.current) return;
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

    const folder = folderFromWidth(window.innerWidth);

    // 1) Browser preload hints for the first chunk
    const removeLinks = injectFramePreloadLinks(
      folder,
      Math.min(32, PRIORITY_COUNT),
    );

    // 2) Continuous aggressive decode + Cache API fill (does not block goHome)
    warmupFramesFromLanding();

    // Absolute escape hatch (video blocked / never ends)
    const failSafe = window.setTimeout(goHome, 12000);

    return () => {
      window.clearTimeout(failSafe);
      removeLinks();
      // Do NOT abort frame sessions — they keep filling after redirect
    };
  }, [router]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        /* failSafe still navigates */
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
          muted
          autoPlay
          preload="auto"
          onTimeUpdate={syncProgress}
          onLoadedMetadata={syncProgress}
          onEnded={() => {
            setProgress(100);
            goHome();
          }}
          onError={goHome}
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
