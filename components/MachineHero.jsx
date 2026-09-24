"use client";

import { useEffect, useState } from "react";
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

const tags = ["From ₹120", "45 seconds", "UPI", "Stored at 4°C"];

function HeroCopy({ compact = false }) {
  return (
    <>
      <h1
        className={`font-extrabold leading-[0.88] tracking-[-0.05em] text-[#FFD4A8] ${
          compact
            ? "text-[clamp(2.85rem,13vw,4.25rem)]"
            : "text-[clamp(4.5rem,11vw,8rem)]"
        }`}
        style={{
          textShadow:
            "0 1px 0 rgba(255,255,255,0.35), 0 4px 28px rgba(80,20,0,0.25)",
        }}
      >
        OranGo
      </h1>

      <p
        className={`max-w-md font-medium leading-snug tracking-[-0.02em] text-white/95 ${
          compact
            ? "mt-3 text-[clamp(1.02rem,3.6vw,1.25rem)]"
            : "mt-5 text-[clamp(1.1rem,2.2vw,1.45rem)]"
        }`}
      >
        Fresh orange juice,
        <span className="block">squeezed in 45 seconds.</span>
      </p>

      <p
        className={`max-w-md leading-relaxed text-white/80 ${
          compact
            ? "mt-3 text-[13.5px] sm:text-[14.5px]"
            : "mt-4 text-[15px] md:text-[16px]"
        }`}
      >
        100% Valencia oranges. No sugar. No preservatives. Pay by UPI, watch it
        squeeze, take a sealed cup. Built for malls, hospitals, offices and
        gyms.
      </p>

      <ul
        className={`flex flex-wrap gap-2 ${compact ? "mt-5" : "mt-7 gap-2.5"}`}
      >
        {tags.map((tag) => (
          <li
            key={tag}
            className={`rounded-full border border-white/35 bg-white/12 font-medium tracking-wide text-white backdrop-blur-sm ${
              compact
                ? "px-3 py-1.5 text-[11.5px]"
                : "px-4 py-2 text-[13px]"
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}

function CtaRow({ tone = "on-orange" }) {
  const primary =
    tone === "on-orange"
      ? "bg-white text-[#8B3410] hover:bg-[#FFFAF6]"
      : "bg-[#EE6F28] text-white hover:bg-[#D45A18]";
  const secondary =
    tone === "on-orange"
      ? "border-white/60 bg-white/10 text-white hover:border-white hover:bg-white/18"
      : "border-[#EE6F28]/35 bg-white text-[#8B3410] hover:border-[#EE6F28] hover:bg-[#FFF5ED]";

  return (
    <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
      <Link
        href="/contact?intent=survey"
        className={`inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-[15px] font-semibold transition-colors duration-200 sm:w-auto ${primary}`}
      >
        Book a site survey
      </Link>
      <Link
        href="/find-orango"
        className={`inline-flex w-full items-center justify-center rounded-full border px-8 py-3.5 text-[15px] font-semibold transition-colors duration-200 sm:w-auto ${secondary}`}
      >
        Find a machine
      </Link>
    </div>
  );
}

function FloatOrange({
  className,
  reduce,
  delay = 0.2,
  width = 420,
  priority = false,
  style,
}) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={style}
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
              delay,
            }
      }
    >
      <Image
        src="/orange1.png"
        alt=""
        width={width}
        height={width}
        className="h-auto w-full drop-shadow-[0_16px_28px_rgba(80,30,0,0.2)]"
        priority={priority}
      />
    </motion.div>
  );
}

export default function MachineHero() {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    setReady(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative isolate bg-white">
      {/* ─── Mobile / tablet ─── */}
      {!isDesktop ? (
        <div className="relative">
          <div className="relative bg-gradient-to-br from-[#FF9A4A] via-[#F07A32] to-[#EE6F28] px-5 pb-[5.5rem] pt-[calc(var(--nav-h)+0.85rem)] sm:px-7 sm:pb-28">
            <OrangeSliceDecor
              className="-right-8 -top-4 h-36 w-36 sm:h-44 sm:w-44"
              opacity={0.22}
              rotate={18}
            />
            <OrangeSliceDecor
              className="-left-10 bottom-24 h-32 w-32 sm:h-40 sm:w-40"
              opacity={0.18}
              rotate={-14}
            />
            <OrangeSliceDecor
              className="right-[10%] bottom-32 h-20 w-20 sm:h-24 sm:w-24"
              opacity={0.14}
              rotate={28}
            />

            {!reduce
              ? [
                  { t: "18%", l: "8%", s: 8 },
                  { t: "42%", l: "78%", s: 6 },
                  { t: "62%", l: "18%", s: 10 },
                ].map((a, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="pointer-events-none absolute z-[1] rounded-full bg-white/35"
                    style={{
                      top: a.t,
                      left: a.l,
                      width: a.s,
                      height: a.s,
                    }}
                    animate={{ y: [0, -6, 0], opacity: [0.25, 0.55, 0.25] }}
                    transition={{
                      duration: 4.5 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.35,
                    }}
                  />
                ))
              : null}

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <HeroCopy compact />
            </motion.div>

            {/* Wave flush into white */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] leading-[0]">
              <svg
                aria-hidden
                className="block h-[4.5rem] w-full sm:h-20"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 68
                     C240 24 480 24 720 58
                     C960 92 1200 100 1440 64
                     L1440 121 L0 121 Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>

          {/* Center orange seated on the wave — above the 3D model */}
          <div className="pointer-events-none relative z-30 -mt-[5.65rem] flex justify-center sm:-mt-[6.1rem]">
            <FloatOrange
              reduce={reduce}
              delay={0.15}
              width={360}
              priority
              className="w-[8.15rem] sm:w-[9.65rem]"
            />
          </div>

          <div className="relative z-10 -mt-14 bg-white px-5 pb-10 pt-2 sm:-mt-16 sm:px-7 sm:pb-12 sm:pt-4">
            <OrangeSliceDecor
              className="-left-8 top-8 h-28 w-28 sm:h-36 sm:w-36"
              opacity={0.16}
              rotate={-12}
            />
            <OrangeSliceDecor
              className="-right-6 top-12 h-32 w-32 sm:h-40 sm:w-40"
              opacity={0.14}
              rotate={20}
            />

            <div className="relative z-10 mx-auto -translate-y-5 h-[min(82vw,450px)] w-full max-w-[min(100%,400px)] sm:-translate-y-6 sm:h-[min(72vw,490px)] sm:max-w-[440px]">
              {ready ? (
                <MachineViewer className="machine-viewer h-full w-full" />
              ) : (
                <div className="h-full w-full" />
              )}

              <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-1 -right-1 z-[2] w-[5.25rem] sm:w-28"
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
                        delay: 0.55,
                      }
                }
              >
                <Image
                  src="/juice.png"
                  alt="Fresh chilled orange juice"
                  width={400}
                  height={500}
                  className="h-auto w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.14)]"
                  priority
                />
              </motion.div>

              <p className="pointer-events-none absolute bottom-1 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#8B3410]/35">
                Drag to spin
              </p>
            </div>

            <div className="relative z-10 mx-auto mt-3 max-w-sm sm:mt-4">
              <CtaRow tone="on-white" />
            </div>
          </div>
        </div>
      ) : (
        /* ─── Desktop ─── */
        <div className="relative h-[100dvh] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[62%]"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 800 1000"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="orangoHeroOrange"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FF9A4A" />
                  <stop offset="48%" stopColor="#F07A32" />
                  <stop offset="100%" stopColor="#EE6F28" />
                </linearGradient>
              </defs>
              <path
                d="M0 0
                   L620 0
                   C700 150 560 270 640 420
                   C730 580 560 700 630 860
                   C655 930 600 980 620 1000
                   L0 1000 Z"
                fill="url(#orangoHeroOrange)"
              />
            </svg>

            <OrangeSliceDecor
              className="left-[12%] top-[14%] h-32 w-32 md:left-[16%] md:h-40 md:w-40"
              opacity={0.22}
              rotate={18}
            />
            <OrangeSliceDecor
              className="bottom-[14%] left-[10%] h-36 w-36 md:h-44 md:w-44"
              opacity={0.16}
              rotate={-14}
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-[50%] top-[58%] z-[5] w-[clamp(12.5rem,24vw,19rem)] -translate-x-1/2 -translate-y-1/2"
          >
            <FloatOrange reduce={reduce} delay={0.2} width={420} priority />
          </div>

          {!reduce
            ? accents.map((a, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute z-[1] rounded-full bg-white/35"
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

          <div className="relative z-10 mx-auto grid h-full w-full max-w-[1500px] grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-stretch gap-4 px-10 pb-10 pt-[calc(var(--nav-h)+1rem)]">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-w-2xl flex-col justify-center self-center pr-10"
            >
              <HeroCopy />
              <div className="mt-10">
                <CtaRow tone="on-orange" />
              </div>
            </motion.div>

            <div className="relative min-h-0">
              <OrangeSliceDecor
                className="right-[-8%] top-[8%] h-52 w-52"
                opacity={0.18}
                rotate={22}
              />
              <OrangeSliceDecor
                className="bottom-[18%] left-[6%] h-40 w-40"
                opacity={0.14}
                rotate={-16}
              />

              <div className="absolute inset-0 -translate-x-5">
                {ready ? (
                  <MachineViewer className="machine-viewer h-full w-full" />
                ) : null}
              </div>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-14 -right-12 z-[2] w-[clamp(7.5rem,15vw,11.5rem)]"
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

              <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#8B3410]/35">
                Drag to spin
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
