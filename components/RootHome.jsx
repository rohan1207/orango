"use client";

import { useCallback, useEffect, useState } from "react";
import LandingIntro from "@/components/LandingIntro";
import New3dScrollHero from "@/components/New3dScrollHero";
import HomePageRest from "@/components/HomePageRest";
import { ensureLiveFramesWarm } from "@/lib/frames";

const INTRO_KEY = "orango-intro-seen";

/**
 * `/` — final site entry.
 * First visit in a tab/session: landing video, then Home 4.
 * Later visits / logo clicks: Home 4 directly (frames from Cache API).
 */
export default function RootHome() {
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    try {
      setShowIntro(sessionStorage.getItem(INTRO_KEY) !== "1");
    } catch {
      setShowIntro(true);
    }
    setReady(true);
  }, []);

  // Return visits: quietly hydrate / keep filling frames from cache + network
  useEffect(() => {
    if (!ready || showIntro) return undefined;
    ensureLiveFramesWarm("home4");
    return undefined;
  }, [ready, showIntro]);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowIntro(false);
    window.dispatchEvent(new Event("orango-intro-done"));
  }, []);

  if (!ready) {
    return <div className="min-h-dvh bg-white" aria-hidden />;
  }

  if (showIntro) {
    return <LandingIntro onComplete={finishIntro} />;
  }

  return (
    <>
      <New3dScrollHero frameSet="home4" skipPreloader />
      <HomePageRest />
    </>
  );
}
