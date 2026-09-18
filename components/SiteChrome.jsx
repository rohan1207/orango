"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileGate from "./MobileGate";
import EarlyModelWarmup from "./EarlyModelWarmup";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const landing = pathname === "/";

  return (
    <>
      <EarlyModelWarmup />
      <MobileGate />
      <div className="max-md:hidden">
        {landing ? null : <Navbar />}
        <div id="main">{children}</div>
        {landing ? null : <Footer />}
      </div>
    </>
  );
}
