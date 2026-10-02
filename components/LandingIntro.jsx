"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  folderFromWidth,
  injectFramePreloadLinks,
  invalidateFrameSessionsForSet,
  probeCacheCoverage,
  readPersistedCoverage,
  totalForFolder,
  warmupFramesFromLanding,
} from "@/lib/frames";

const HOME_FRAME_SET = "home4";
/** Absolute failsafe — only if network is badly broken */
const ABSOLUTE_FAILSAFE_MS = 120000;

/**
 * Landing video + full frame preload (112 desktop).
 * - Always plays the full video, even if frames finish early.
 * - If video ends first, stays until all frames are ready.
 * - Leaves only when BOTH video ended AND frames are 100%.
 * - One progress slider only.
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
    // Need full video AND all frames
    if (!videoEndedRef.current || !framesReadyRef.current) return;
    doneRef.current = true;
    onComplete?.();
  };

  const syncVideoProgress = () => {
    // While video is playing, the single slider follows the video
    if (videoEndedRef.current) return;
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const pct = (video.currentTime / video.duration) * 100;
    setSliderPct(Math.min(100, Math.max(0, pct)));
  };

  useEffect(() => {
    // Drop any stale in-memory session (old counts / held frames)
    invalidateFrameSessionsForSet(HOME_FRAME_SET);

    const folder = folderFromWidth(window.innerWidth, HOME_FRAME_SET);
    const total = totalForFolder(folder);

    readPersistedCoverage(folder); // warm local hint only
    const removeLinks = injectFramePreloadLinks(folder, total);
    probeCacheCoverage(folder).catch(() => {});

    const session = warmupFramesFromLanding(HOME_FRAME_SET);
    if (session?.subscribe) {
      sessionUnsubRef.current = session.subscribe(
        ({ loaded, total: t }) => {
          if (t > 0) {
            setSliderPct((prev) =>
              videoEndedRef.current
                ? Math.round((loaded / t) * 100)
                : prev,
            );
          }
          if (t > 0 && loaded >= t) {
            framesReadyRef.current = true;
            setFramesReady(true);
            if (videoEndedRef.current) {
              setSliderPct(100);
              tryFinish();
            }
          }
        },
      );
    }

    // Authoritative: wait for preload promise to fully finish (incl. retries)
    session?.promise?.then?.(() => {
      if (doneRef.current) return;
      if (session.total > 0 && session.loaded >= session.total) {
        framesReadyRef.current = true;
        setFramesReady(true);
        if (videoEndedRef.current) {
          setSliderPct(100);
          tryFinish();
        }
      }
    });

    if (session?.total > 0 && session.loaded >= session.total) {
      framesReadyRef.current = true;
      setFramesReady(true);
      if (videoEndedRef.current) tryFinish();
    }

    const failSafe = window.setTimeout(() => {
      framesReadyRef.current = true;
      videoEndedRef.current = true;
      setFramesReady(true);
      setVideoEnded(true);
      setSliderPct(100);
      tryFinish();
    }, ABSOLUTE_FAILSAFE_MS);

    return () => {
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
        /* still gated by frames + video end */
      }
    };

    tryPlay();
  }, []);

  const onVideoDone = () => {
    videoEndedRef.current = true;
    setVideoEnded(true);
    setSliderPct(framesReadyRef.current ? 100 : sliderPct);
    // Leave only if frames are also ready; otherwise stay and show frame load on same slider
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
