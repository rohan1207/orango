"use client";

import Image from "next/image";

/**
 * Decorative orange-slice background accent.
 * Pass position/size via className (e.g. "right-[-6%] top-[20%] h-44 w-44").
 */
export default function OrangeSliceDecor({
  className = "",
  opacity = 0.2,
  rotate = 0,
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      <Image
        src="/orange-bg.png"
        alt=""
        fill
        className="object-contain"
        sizes="280px"
      />
    </span>
  );
}
