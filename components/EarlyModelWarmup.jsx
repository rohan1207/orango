"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { preloadMachineAssets } from "@/lib/preloadMachine";

/** Starts model warmup as soon as `/` hydrates (even before video mounts). */
export default function EarlyModelWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      preloadMachineAssets();
    }
  }, [pathname]);

  return null;
}
