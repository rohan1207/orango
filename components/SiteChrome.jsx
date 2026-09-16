"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const intro = pathname === "/intro";

  return (
    <>
      {intro ? null : <Navbar />}
      <div id="main">{children}</div>
      {intro ? null : <Footer />}
    </>
  );
}
