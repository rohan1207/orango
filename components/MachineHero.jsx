"use client";

import { useReducedMotion, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MachineViewer from "./MachineViewer";
import OrangeSliceDecor from "./OrangeSliceDecor";

const accents = [
  { t: "14%", l: "10%", s: 10 },
  { t: "32%", l: "26%", s: 7 },
  { t: "68%", l: "16%", s: 14 },
  { t: "22%", l: "38%", s: 8 },
];

export default function MachineHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate h-[100dvh] overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[62%] max-lg:inset-x-0 max-lg:top-0 max-lg:h-[52%] max-lg:w-full"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 800 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="orangoHeroOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9A4A" />
              <stop offset="48%" stopColor="#F07A32" />
              <stop offset="100%" stopColor="#EE6F28" />
            </linearGradient>
          </defs>
          <path
            className="max-lg:hidden"
            d="M0 0
               L620 0
               C700 150 560 270 640 420
               C730 580 560 700 630 860
               C655 930 600 980 620 1000
               L0 1000 Z"
            fill="url(#orangoHeroOrange)"
          />
          <path
            className="lg:hidden"
            d="M0 0 L800 0 L800 820
               C640 900 420 860 280 920
               C160 960 60 940 0 980 Z"
            fill="url(#orangoHeroOrange)"
          />
        </svg>

        <OrangeSliceDecor
          className="right-[14%] top-[16%] h-32 w-32 md:h-40 md:w-40"
          opacity={0.22}
          rotate={18}
        />
        <OrangeSliceDecor
          className="bottom-[14%] left-[10%] h-36 w-36 md:h-44 md:w-44"
          opacity={0.16}
          rotate={-14}
        />
      </div>

      {/* orange1 â€” centered on the vertical wavy partition */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[50%] top-[58%] z-[5] w-[clamp(12.5rem,24vw,19rem)] -translate-x-1/2 -translate-y-1/2 max-lg:left-1/2 max-lg:top-[46%] max-lg:w-[clamp(9rem,38vw,13.5rem)]"
      >
        <motion.div
          initial={false}
          animate={reduce ? { y: 0 } : { y: -4 }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 48,
                  damping: 16,
                  mass: 0.9,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 0.2,
                }
          }
        >
          <Image
            src="/orange1.png"
            alt=""
            width={420}
            height={420}
            className="h-auto w-full drop-shadow-[0_20px_36px_rgba(80,30,0,0.22)]"
            priority
          />
        </motion.div>
      </div>

      {!reduce
        ? accents.map((a, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute z-[1] rounded-full bg-white/35 max-lg:hidden"
              style={{
                top: a.t,
                left: a.l,
                width: a.s,
                height: a.s,
              }}
              animate={{ y: [0, -8, 0], opacity: [0.25, 0.55, 0.25] }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))
        : null}

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 px-6 pb-8 pt-[calc(var(--nav-h)+1rem)] md:px-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-stretch lg:gap-4 lg:pb-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex max-w-2xl flex-col justify-center max-lg:mb-4 lg:self-center lg:pr-10"
        >
          <h1
            className="text-[clamp(4.5rem,11vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-[#FFD4A8]"
            style={{
              textShadow:
                "0 1px 0 rgba(255,255,255,0.35), 0 4px 28px rgba(80,20,0,0.25)",
            }}
          >
            Orango
          </h1>

          <p className="mt-5 max-w-md text-[clamp(1.1rem,2.2vw,1.45rem)] font-medium leading-snug tracking-[-0.02em] text-white/95">
            100% pure orange juice,
            <span className="block">freshly squeezed.</span>
          </p>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 md:text-[16px]">
            Automated Valencia orange juice vending for malls, offices,
            hospitals, and campuses. Chilled, hygienic, and UPI-ready â€”
            sealed in under a minute.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {["No additives", "No dilution", "Ready in 45s"].map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/35 bg-white/12 px-4 py-2 text-[13px] font-medium tracking-wide text-white backdrop-blur-sm"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-[#0F3D37] transition-colors duration-200 hover:bg-[#F7FBFA]"
            >
              Place a machine
            </Link>
            <Link
              href="/business-opportunity"
              className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-8 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/18"
            >
              Partner with us
            </Link>
          </div>
        </motion.div>

        <div className="relative min-h-0 max-lg:min-h-[46vh] lg:h-auto">
          {/* Right section â€” top left (orange3 paused)
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-14 top-[6%] z-[2] w-[clamp(7.25rem,14.5vw,11.5rem)] max-lg:-left-6 max-lg:top-2 max-lg:w-28"
            initial={false}
            animate={reduce ? { y: 0 } : { y: -5 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 48,
                    damping: 16,
                    mass: 0.9,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 0.4,
                  }
            }
          >
            <Image
              src="/orange3.png"
              alt=""
              width={300}
              height={300}
              className="h-auto w-full drop-shadow-[0_14px_24px_rgba(0,0,0,0.12)]"
              priority
            />
          </motion.div>
          */}

          <div className="absolute inset-0 -translate-x-3 lg:-translate-x-5">
            <MachineViewer className="machine-viewer h-full w-full" />
          </div>

          {/* Right section â€” bottom right: juice glass */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-2 right-0 z-[2] w-[clamp(7.5rem,15vw,11.5rem)] max-lg:bottom-8 max-lg:right-1 max-lg:w-28"
            initial={false}
            animate={reduce ? { y: 0 } : { y: -4 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 48,
                    damping: 16,
                    mass: 0.9,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 0.6,
                  }
            }
          >
            <Image
              src="/juice.png"
              alt="Fresh chilled orange juice"
              width={400}
              height={500}
              className="h-auto w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.16)]"
              priority
            />
          </motion.div>

          <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0F3D37]/35">
            Drag to spin
          </p>
        </div>
      </div>
    </section>
  );
}
