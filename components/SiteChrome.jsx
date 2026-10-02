"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EarlyModelWarmup from "./EarlyModelWarmup";
import MobileStickyBar from "./MobileStickyBar";
import { usePathname } from "next/navigation";

const INTRO_KEY = "orango-intro-seen";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const [hideChrome, setHideChrome] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      setHideChrome(false);
      return undefined;
    }

    const sync = () => {
      try {
        setHideChrome(sessionStorage.getItem(INTRO_KEY) !== "1");
      } catch {
        setHideChrome(true);
      }
    };

    sync();
    window.addEventListener("orango-intro-done", sync);
    return () => window.removeEventListener("orango-intro-done", sync);
  }, [pathname]);

  return (
    <>
      <EarlyModelWarmup />
      <div className="w-full max-w-full overflow-x-clip">
        {hideChrome ? null : <Navbar />}
        <div
          id="main"
          className={`w-full max-w-full ${hideChrome ? "" : "pb-20 lg:pb-0"}`}
        >
          {children}
        </div>
        {hideChrome ? null : <Footer />}
        {hideChrome ? null : <MobileStickyBar />}
      </div>
    </>
  );
}
