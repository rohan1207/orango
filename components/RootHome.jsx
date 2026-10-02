"use client";

import { useCallback, useState } from "react";
import LandingIntro from "@/components/LandingIntro";
import New3dScrollHero from "@/components/New3dScrollHero";
import HomePageRest from "@/components/HomePageRest";

/**
 * `/` — logo landing until ALL frames are ready, then full Home 4 hero.
 * Return visits hydrate from Cache API so the logo screen is usually brief.
 */
export default function RootHome() {
  const [showIntro, setShowIntro] = useState(true);

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    window.dispatchEvent(new Event("orango-intro-done"));
  }, []);

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
