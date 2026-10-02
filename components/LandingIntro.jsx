"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  folderFromWidth,
  injectFramePreloadLinks,
  probeCacheCoverage,
  readPersistedCoverage,
  totalForFolder,
  warmupFramesFromLanding,
} from "@/lib/frames";

const HOME_FRAME_SET = "home4";
/** Must have every frame before entering the homepage hero */
const REQUIRED_RATIO = 1;
/** Absolute failsafe — only if network is badly broken */
const ABSOLUTE_FAILSAFE_MS = 120000;

/**
 * Landing: big OranGo logo while all scroll frames preload (132 desktop).
 * Only then hand off to the homepage so the hero animation is complete.
 */
export default function LandingIntro({ onComplete }) {
  const reduce = useReducedMotion();
  const doneRef = useRef(false);
  const frameRatioRef = useRef(0);
  const sessionUnsubRef = useRef(null);

  const [framePct, setFramePct] = useState(0);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete?.();
  };

  useEffect(() => {
    const folder = folderFromWidth(window.innerWidth, HOME_FRAME_SET);
    const total = totalForFolder(folder);

    const persisted = readPersistedCoverage(folder);
    if (persisted?.ratio) {
      frameRatioRef.current = Math.max(frameRatioRef.current, persisted.ratio);
      setFramePct(Math.round(Math.min(1, persisted.ratio) * 100));
      if (persisted.ratio >= REQUIRED_RATIO && persisted.loaded >= total) {
        // Still kick warmup so in-memory session is hot, then finish shortly
      }
    }

    const removeLinks = injectFramePreloadLinks(folder, total);

    probeCacheCoverage(folder).then(({ ratio, hits }) => {
      if (doneRef.current) return;
      frameRatioRef.current = Math.max(frameRatioRef.current, ratio);
      setFramePct(Math.round(frameRatioRef.current * 100));
      if (hits >= total && ratio >= REQUIRED_RATIO) {
        // Cache is full — warmup will hydrate instantly; finish when session confirms
      }
    });

    // Load ALL frames (no 50% early exit)
    const session = warmupFramesFromLanding(HOME_FRAME_SET);
    if (session?.subscribe) {
      sessionUnsubRef.current = session.subscribe(
        ({ ratio, loaded, total: t }) => {
          const r = Math.min(1, Math.max(0, ratio || 0));
          frameRatioRef.current = Math.max(frameRatioRef.current, r);
          setFramePct(Math.round(frameRatioRef.current * 100));
          // Only enter homepage when every frame is in memory
          if (!doneRef.current && t > 0 && loaded >= t) {
            finish();
          }
        },
      );
      if (session.loaded >= session.total && session.total > 0) {
        finish();
      }
    }

    const failSafe = window.setTimeout(finish, ABSOLUTE_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failSafe);
      if (sessionUnsubRef.current) sessionUnsubRef.current();
      removeLinks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-[#FFFAF6] px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(238,111,40,0.14), transparent 60%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -6, 0],
                }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/logo.png"
            alt="OranGo"
            width={420}
            height={120}
            priority
            className="h-auto w-[min(72vw,380px)] object-contain drop-shadow-[0_12px_40px_rgba(238,111,40,0.18)]"
          />
        </motion.div>

        <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.28em] text-[#EE6F28]">
          Fresh juice. Automated.
        </p>
      </motion.div>

      <div className="relative z-10 mt-14 w-full max-w-[min(360px,86vw)]">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-[#EE6F28]/15">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[#EE6F28]"
            initial={false}
            animate={{ width: `${framePct}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#8B3410]/45">
          <span>Loading experience</span>
          <span>{framePct}%</span>
        </div>
      </div>
    </main>
  );
}
