"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  LANDING_MIN_FRAME_RATIO,
  folderFromWidth,
  injectFramePreloadLinks,
  probeCacheCoverage,
  readPersistedCoverage,
  totalForFolder,
  warmupFramesFromLanding,
} from "@/lib/frames";

const HOME_FRAME_SET = "home4";
/** Extra wait after video if frames are still under 50% */
const FRAME_GATE_EXTRA_MS = 4500;
/** Absolute failsafe so users are never stuck on landing */
const ABSOLUTE_FAILSAFE_MS = 16000;

/**
 * Landing intro video.
 * While it plays, aggressively preloads final_frames_desktop (or mobile set).
 * Aims for ≥50% before handing off; Cache API makes return visits much faster.
 */
export default function LandingIntro({ onComplete }) {
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const videoEndedRef = useRef(false);
  const frameRatioRef = useRef(0);
  const sessionUnsubRef = useRef(null);
  const gateTimerRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [framePct, setFramePct] = useState(0);
  const [waitingFrames, setWaitingFrames] = useState(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (gateTimerRef.current) {
      window.clearTimeout(gateTimerRef.current);
      gateTimerRef.current = null;
    }
    onComplete?.();
  };

  const tryFinish = () => {
    if (doneRef.current) return;
    if (!videoEndedRef.current) return;

    if (frameRatioRef.current >= LANDING_MIN_FRAME_RATIO) {
      setWaitingFrames(false);
      finish();
      return;
    }

    setWaitingFrames(true);
    if (gateTimerRef.current) return;
    gateTimerRef.current = window.setTimeout(() => {
      finish();
    }, FRAME_GATE_EXTRA_MS);
  };

  const syncProgress = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const pct = (video.currentTime / video.duration) * 100;
    setProgress(Math.min(100, Math.max(0, pct)));
  };

  useEffect(() => {
    const folder = folderFromWidth(window.innerWidth, HOME_FRAME_SET);

    // Instant hint from last visit (localStorage) while Cache API probe runs
    const persisted = readPersistedCoverage(folder);
    if (persisted?.ratio) {
      frameRatioRef.current = Math.max(frameRatioRef.current, persisted.ratio);
      setFramePct(Math.round(persisted.ratio * 100));
    }

    const removeLinks = injectFramePreloadLinks(
      folder,
      totalForFolder(folder),
    );

    // Confirm Cache API coverage — return visits often already ≥50%
    probeCacheCoverage(folder).then(({ ratio }) => {
      if (doneRef.current) return;
      frameRatioRef.current = Math.max(frameRatioRef.current, ratio);
      setFramePct(Math.round(frameRatioRef.current * 100));
      if (
        videoEndedRef.current &&
        frameRatioRef.current >= LANDING_MIN_FRAME_RATIO
      ) {
        finish();
      }
    });

    const session = warmupFramesFromLanding(HOME_FRAME_SET);
    if (session?.subscribe) {
      sessionUnsubRef.current = session.subscribe(({ ratio }) => {
        const r = Math.min(1, Math.max(0, ratio || 0));
        frameRatioRef.current = Math.max(frameRatioRef.current, r);
        setFramePct(Math.round(frameRatioRef.current * 100));
        if (
          videoEndedRef.current &&
          frameRatioRef.current >= LANDING_MIN_FRAME_RATIO &&
          !doneRef.current
        ) {
          finish();
        }
      });
    }

    const failSafe = window.setTimeout(finish, ABSOLUTE_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failSafe);
      if (gateTimerRef.current) window.clearTimeout(gateTimerRef.current);
      if (sessionUnsubRef.current) sessionUnsubRef.current();
      removeLinks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-once intro
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        /* failSafe / ended handlers still finish */
      }
    };

    tryPlay();
  }, []);

  const onVideoDone = () => {
    setProgress(100);
    videoEndedRef.current = true;
    tryFinish();
  };

  const pct = Math.round(progress);
  const showFrameHint = framePct > 0 || waitingFrames;

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
          {waitingFrames ? "Preparing experience…" : `${pct}%`}
        </p>
        {showFrameHint ? (
          <p className="mt-1.5 text-center text-[11px] tracking-wide text-[#8B3410]/35">
            Experience ready {Math.min(framePct, 100)}%
          </p>
        ) : null}
      </div>
    </main>
  );
}
