"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function MachineViewer({ className = "" }) {
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let alive = true;
    import("@google/model-viewer").then(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!ready) {
    return (
      <div className={`relative ${className}`} aria-hidden>
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
    );
  }

  // Turntable orbit: horizontal spin only — fixed tilt + radius, no zoom or pan.
  const radius = compact ? "102%" : "92%";
  const fov = compact ? "26deg" : "20deg";
  const polar = compact ? "80deg" : "78deg";
  const azimuth = compact ? "18deg" : "22deg";
  const orbit = `${azimuth} ${polar} ${radius}`;
  const lockedOrbit = `auto ${polar} ${radius}`;

  return (
    <model-viewer
      src="/orange_machine.glb"
      alt="Orango fresh orange juice vending machine"
      className={className}
      camera-controls="true"
      disable-zoom="true"
      disable-pan="true"
      auto-rotate
      auto-rotate-delay="1200"
      rotation-per-second="6deg"
      interaction-prompt="none"
      shadow-intensity="0.55"
      shadow-softness="1"
      exposure="1.18"
      environment-image="neutral"
      camera-orbit={orbit}
      min-camera-orbit={lockedOrbit}
      max-camera-orbit={lockedOrbit}
      camera-target="auto"
      field-of-view={fov}
      min-field-of-view={fov}
      max-field-of-view={fov}
      touch-action="none"
      interpolation-decay="90"
      loading="eager"
      reveal="auto"
    />
  );
}
