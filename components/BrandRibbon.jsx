"use client";

import { Fragment, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const words = ["Pure", "Fresh", "Valencia", "Hygienic", "Orango"];

function Word({ children, outlined }) {
  return (
    <span
      className={`mx-5 whitespace-nowrap text-5xl font-black uppercase tracking-[-0.03em] sm:mx-7 sm:text-6xl lg:mx-10 lg:text-8xl ${
        outlined ? "text-transparent" : "text-[#EE6F28]"
      }`}
      style={
        outlined
          ? { WebkitTextStroke: "2px #EE6F28" }
          : undefined
      }
    >
      {children}
    </span>
  );
}

export default function BrandRibbon() {
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const sequence = [...words, ...words, ...words, ...words];

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-[#EE6F28]/10 bg-[#FFFAF6] py-8 sm:py-10 lg:py-12"
    >
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: compact ? 12 : 28,
                  ease: "linear",
                },
              }
        }
      >
        <div className="flex shrink-0 items-center">
          {sequence.map((word, index) => (
            <Fragment key={`a-${index}`}>
              <Word outlined={index % 2 !== 0}>{word}</Word>
            </Fragment>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          {sequence.map((word, index) => (
            <Fragment key={`b-${index}`}>
              <Word outlined={index % 2 !== 0}>{word}</Word>
            </Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
