"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { preloadMachineAssets } from "@/lib/preloadMachine";

/**
 * Warm the 3D model only when the 3D hero is actually used.
 * MachineHero is currently commented out — skip heavy GLB on landing/home.
 */
export default function EarlyModelWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-enable when MachineHero is restored on /home
    const use3dHero = false;
    if (!use3dHero) return;
    if (pathname === "/" || pathname === "/home") {
      preloadMachineAssets();
    }
  }, [pathname]);

  return null;
}
