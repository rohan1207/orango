"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { brand } from "@/lib/site";
import OrangeSliceDecor from "./OrangeSliceDecor";

const features = [
  {
    title: "SQUEEZED TO ORDER",
    subtitle: "Ready in about 45 seconds",
    icon: (
      <path
        d="M12 3v3m0 12v3M3 12h3m12 0h3M6.2 6.2l2.1 2.1m7.4 7.4 2.1 2.1m0-11.6-2.1 2.1M8.3 15.7l-2.1 2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    title: "100% PURE",
    subtitle: "No sugar · no preservatives",
    icon: (
      <path
        d="M8 11V7a4 4 0 1 1 8 0v4m-9 0h10l-1 9H8l-1-9Zm3.5 4.5h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "PAY WITH UPI",
    subtitle: "Tap, pay, take your cup",
    icon: (
      <path
        d="M7 7h10v10H7V7Zm3 14h4M9 3h6m-1 18v-2M10 21v-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

export default function ExperienceSection() {
  const reduce = useReducedMotion();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const smoothRotate = useSpring(rotate, {
    stiffness: 50,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <section
      ref={targetRef}
      className="relative w-full max-w-full overflow-x-clip bg-white px-5 py-10 sm:px-8 sm:py-16 md:px-8"
    >
      <OrangeSliceDecor
        className="-left-12 top-[12%] h-40 w-40 md:-left-10 md:h-52 md:w-52"
        opacity={0.16}
        rotate={-18}
      />
      <OrangeSliceDecor
        className="-right-14 bottom-[10%] h-44 w-44 md:-right-12 md:h-56 md:w-56"
        opacity={0.14}
        rotate={22}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <motion.div
          className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
          style={reduce ? undefined : { rotate: smoothRotate }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Image
            src="/orange.png"
            alt="Fresh Valencia orange used in OranGo juice machines"
            width={720}
            height={720}
            className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(238,111,40,0.22)]"
            sizes="(max-width: 1024px) 80vw, 42vw"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <h2 className="max-w-xl text-[clamp(1.9rem,4vw,3.1rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#8B3410]">
            REAL JUICE.
            <br />
            RIGHT WHERE PEOPLE ARE.
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#8B3410]/65">
            OranGo places automated machines in malls, hospitals, offices and
            gyms. Guests see Valencia oranges squeezed to order — untouched by
            hand — then take a sealed cup. You provide the space. We handle the
            rest.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <Link
              href="/contact?intent=survey"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-7 py-3.5 text-[13px] font-bold tracking-[0.12em] text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
            >
              BOOK A SITE SURVEY
            </Link>

            <a
              href={brand.phoneHref}
              className="inline-flex items-center justify-center gap-3 text-[#8B3410] sm:justify-start"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EE6F28] text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M8.5 4.5h2.2l1 4.2-1.6 1a12.5 12.5 0 0 0 5.2 5.2l1-1.6 4.2 1v2.2c0 .9-.7 1.7-1.6 1.6A16.5 16.5 0 0 1 4.9 6.1c-.1-.9.7-1.6 1.6-1.6Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[16px] font-bold tracking-[-0.02em]">
                {brand.phone}
              </span>
            </a>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                viewport={{ once: true }}
                className="rounded-[1.15rem] border border-[#EE6F28]/12 bg-[#FFFAF6] px-4 py-4"
              >
                <div className="mb-2.5 grid h-10 w-10 place-items-center rounded-full bg-white text-[#EE6F28] shadow-[0_6px_16px_rgba(238,111,40,0.12)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-[12px] font-bold tracking-wider text-[#8B3410]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-[12px] leading-snug text-[#8B3410]/55">
                  {feature.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
