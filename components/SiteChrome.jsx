"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import EarlyModelWarmup from "./EarlyModelWarmup";
import MobileStickyBar from "./MobileStickyBar";
import { usePathname } from "next/navigation";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const landing = pathname === "/";

  return (
    <>
      <EarlyModelWarmup />
      <div className="w-full max-w-full overflow-x-clip">
        {landing ? null : <Navbar />}
        <div
          id="main"
          className={`w-full max-w-full ${landing ? "" : "pb-20 lg:pb-0"}`}
        >
          {children}
        </div>
        {landing ? null : <Footer />}
        {landing ? null : <MobileStickyBar />}
      </div>
    </>
  );
}
