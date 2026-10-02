"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { preloadMachineAssets } from "@/lib/preloadMachine";

/**
 * Warm the 3D model only when the 3D hero is actually used (/home2).
 */
export default function EarlyModelWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/home2") {
      preloadMachineAssets();
    }
  }, [pathname]);

  return null;
}
