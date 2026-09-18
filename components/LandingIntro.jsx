"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { INTRO_COOKIE } from "@/lib/intro";

export default function LandingIntro() {
  const router = useRouter();
  const videoRef = useRef(null);
  const doneRef = useRef(false);

  const goHome = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.cookie = `${INTRO_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.push("/");
    router.refresh();
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
          /* autoplay may be blocked */
        }
      }
    };

    tryPlay();
  }, []);

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden bg-white">
      <video
        ref={videoRef}
        src="/video.mp4"
        className="max-h-[70vh] w-auto max-w-[min(920px,92vw)] object-contain"
        playsInline
        autoPlay
        preload="auto"
        onEnded={goHome}
      />
    </main>
  );
}
