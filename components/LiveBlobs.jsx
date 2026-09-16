"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const defaults = [
  {
    className: "left-[-6%] top-[10%] h-40 w-40 md:h-52 md:w-52",
    opacity: 0.22,
    delay: 0,
    rotate: [0, 12, -6, 0],
  },
  {
    className: "right-[-5%] top-[18%] h-32 w-32 md:h-44 md:w-44",
    opacity: 0.16,
    delay: 0.8,
    rotate: [0, -10, 8, 0],
  },
  {
    className: "bottom-[4%] left-[28%] h-28 w-28 md:h-36 md:w-36",
    opacity: 0.2,
    delay: 0.4,
    rotate: [0, 8, -10, 0],
  },
];

export default function LiveBlobs({ items = defaults }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {items.map((blob, i) => (
        <motion.span
          key={i}
          className={`absolute ${blob.className}`}
          style={{ opacity: blob.opacity ?? 0.2 }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -10, 5, 0],
                  x: [0, 8, -5, 0],
                  rotate: blob.rotate ?? [0, 8, -6, 0],
                }
          }
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay ?? 0,
          }}
        >
          <Image
            src="/orange-bg.png"
            alt=""
            fill
            className="object-contain"
            sizes="220px"
          />
        </motion.span>
      ))}
    </div>
  );
}
