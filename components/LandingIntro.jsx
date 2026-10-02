"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  folderFromWidth,
  injectFramePreloadLinks,
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
 * Video can end early — we stay on this page until every frame is loaded.
 */
export default function LandingIntro({ onComplete }) {
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const framesReadyRef = useRef(false);
  const videoEndedRef = useRef(false);
  const sessionUnsubRef = useRef(null);

  const [videoPct, setVideoPct] = useState(0);
  const [framePct, setFramePct] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  const finish = () => {
    if (doneRef.current) return;
    // Stay until ALL frames are ready — even if the video already ended
    if (!framesReadyRef.current) return;
    doneRef.current = true;
    onComplete?.();
  };

  const syncVideoProgress = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const pct = (video.currentTime / video.duration) * 100;
    setVideoPct(Math.min(100, Math.max(0, pct)));
  };

  useEffect(() => {
    const folder = folderFromWidth(window.innerWidth, HOME_FRAME_SET);
    const total = totalForFolder(folder);

    const persisted = readPersistedCoverage(folder);
    if (persisted?.ratio) {
      setFramePct(Math.round(Math.min(1, persisted.ratio) * 100));
    }

    const removeLinks = injectFramePreloadLinks(folder, total);

    probeCacheCoverage(folder).then(({ ratio }) => {
      if (doneRef.current) return;
      setFramePct(Math.round(Math.min(1, ratio) * 100));
    });

    const session = warmupFramesFromLanding(HOME_FRAME_SET);
    if (session?.subscribe) {
      sessionUnsubRef.current = session.subscribe(
        ({ ratio, loaded, total: t }) => {
          const r = Math.min(1, Math.max(0, ratio || 0));
          setFramePct(Math.round(r * 100));
          if (t > 0 && loaded >= t) {
            framesReadyRef.current = true;
            setFramesReady(true);
            finish();
          }
        },
      );
      if (session.total > 0 && session.loaded >= session.total) {
        framesReadyRef.current = true;
        setFramesReady(true);
        finish();
      }
    }

    const failSafe = window.setTimeout(() => {
      framesReadyRef.current = true;
      setFramesReady(true);
      finish();
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
        /* frames gate still controls exit */
      }
    };

    tryPlay();
  }, []);

  const onVideoDone = () => {
    setVideoPct(100);
    videoEndedRef.current = true;
    setVideoEnded(true);
    // Do not leave yet — wait for frames unless already ready
    finish();
  };

  const waitingAfterVideo = videoEnded && !framesReady;

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
        {/* Video progress */}
        <div className="relative h-1.5 rounded-full bg-[#EE6F28]/15">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[#EE6F28] transition-[width] duration-150 ease-linear"
            style={{ width: `${videoPct}%` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ease-linear"
            style={{ left: `${videoPct}%` }}
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
          {waitingAfterVideo
            ? "Preparing experience…"
            : `${Math.round(videoPct)}%`}
        </p>

        {/* Frame preload progress — stays until 100% even after video ends */}
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#8B3410]/8">
          <div
            className="h-full rounded-full bg-[#EE6F28]/70 transition-[width] duration-200 ease-out"
            style={{ width: `${framePct}%` }}
          />
        </div>
        <p className="mt-2 text-center text-[11px] tracking-wide text-[#8B3410]/35">
          Experience ready {framePct}%
        </p>
      </div>
    </main>
  );
}
