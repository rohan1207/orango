"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  clearAllFrameCaches,
  folderFromWidth,
  injectFramePreloadLinks,
  invalidateFrameSessionsForSet,
  totalForFolder,
  warmupFramesFromLanding,
} from "@/lib/frames";

const HOME_FRAME_SET = "home4";
const ABSOLUTE_FAILSAFE_MS = 120000;

/**
 * Landing video + full frame preload (112 desktop).
 * Leaves only when BOTH the video finished AND all 112 frames are really loaded.
 */
export default function LandingIntro({ onComplete }) {
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const framesReadyRef = useRef(false);
  const videoEndedRef = useRef(false);
  const sessionUnsubRef = useRef(null);

  const [sliderPct, setSliderPct] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  const tryFinish = () => {
    if (doneRef.current) return;
    if (!videoEndedRef.current || !framesReadyRef.current) return;
    doneRef.current = true;
    onComplete?.();
  };

  const syncVideoProgress = () => {
    if (videoEndedRef.current) return;
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const pct = (video.currentTime / video.duration) * 100;
    setSliderPct(Math.min(100, Math.max(0, pct)));
  };

  useEffect(() => {
    let cancelled = false;
    let failSafe = 0;
    let removeLinks = () => {};

    (async () => {
      invalidateFrameSessionsForSet(HOME_FRAME_SET);
      await clearAllFrameCaches();
      if (cancelled) return;

      const folder = folderFromWidth(window.innerWidth, HOME_FRAME_SET);
      const total = totalForFolder(folder);
      removeLinks = injectFramePreloadLinks(folder, total);

      const session = warmupFramesFromLanding(HOME_FRAME_SET);

      const markFramesReady = () => {
        framesReadyRef.current = true;
        setFramesReady(true);
        if (videoEndedRef.current) {
          setSliderPct(100);
          tryFinish();
        }
      };

      if (session?.subscribe) {
        sessionUnsubRef.current = session.subscribe(({ loaded, total: t }) => {
          if (t > 0 && videoEndedRef.current) {
            setSliderPct(Math.round((loaded / t) * 100));
          }
          if (t > 0 && loaded >= t) markFramesReady();
        });
      }

      session?.promise?.then?.(() => {
        if (cancelled || doneRef.current) return;
        if (session.total > 0 && session.loaded >= session.total) {
          markFramesReady();
        }
      });

      failSafe = window.setTimeout(() => {
        framesReadyRef.current = true;
        videoEndedRef.current = true;
        setFramesReady(true);
        setVideoEnded(true);
        setSliderPct(100);
        tryFinish();
      }, ABSOLUTE_FAILSAFE_MS);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      if (sessionUnsubRef.current) sessionUnsubRef.current();
      removeLinks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        /* gated by frames + video end */
      }
    };

    tryPlay();
  }, []);

  const onVideoDone = () => {
    videoEndedRef.current = true;
    setVideoEnded(true);
    if (framesReadyRef.current) setSliderPct(100);
    tryFinish();
  };

  const waitingForFrames = videoEnded && !framesReady;
  const label = waitingForFrames
    ? "Preparing experience…"
    : `${Math.round(sliderPct)}%`;

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
          onTimeUpdate={syncVideoProgress}
          onLoadedMetadata={syncVideoProgress}
          onEnded={onVideoDone}
          onError={onVideoDone}
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
            style={{ width: `${sliderPct}%` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ease-linear"
            style={{ left: `${sliderPct}%` }}
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
          {label}
        </p>
      </div>
    </main>
  );
}
