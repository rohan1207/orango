"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  adoptMachineViewer,
  applyOrbit,
  parkMachineViewer,
} from "@/lib/preloadMachine";

export default function MachineViewer({ className = "" }) {
  const hostRef = useRef(null);
  const viewerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let alive = true;
    const compact = window.matchMedia("(max-width: 1023px)").matches;

    adoptMachineViewer(host, { className, compact }).then((el) => {
      if (!alive) {
        parkMachineViewer();
        return;
      }
      viewerRef.current = el;
      if (el) setMounted(true);
    });

    const mq = window.matchMedia("(max-width: 1023px)");
    const onMq = (e) => {
      if (viewerRef.current) applyOrbit(viewerRef.current, e.matches);
    };
    mq.addEventListener("change", onMq);

    return () => {
      alive = false;
      mq.removeEventListener("change", onMq);
      parkMachineViewer();
    };
    // Adopt once — do not re-run on compact flips (that was causing reload).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className]);

  return (
    <div ref={hostRef} className={`relative ${className}`}>
      {!mounted ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 opacity-25 md:h-52 md:w-52">
            <Image
              src="/orange-bg.png"
              alt=""
              fill
              className="object-contain"
              sizes="220px"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
