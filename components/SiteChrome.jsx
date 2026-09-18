"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EarlyModelWarmup from "./EarlyModelWarmup";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const landing = pathname === "/";

  return (
    <>
      <EarlyModelWarmup />
      <div className="w-full max-w-full overflow-x-clip">
        {landing ? null : <Navbar />}
        <div id="main" className="w-full max-w-full">
          {children}
        </div>
        {landing ? null : <Footer />}
      </div>
    </>
  );
}
