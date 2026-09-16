"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileGate from "./MobileGate";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const intro = pathname === "/intro";

  return (
    <>
      <MobileGate />
      <div className="max-md:hidden">
        {intro ? null : <Navbar />}
        <div id="main">{children}</div>
        {intro ? null : <Footer />}
      </div>
    </>
  );
}
