"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const steps = [
  {
    id: "pay",
    number: "01",
    title: "Tap & Pay",
    description:
      "Choose your juice and pay instantly with UPI or card - no cash, no queues.",
    live: "Payment successful",
  },
  {
    id: "squeeze",
    number: "02",
    title: "Freshly squeezed",
    description:
      "Watch Valencia oranges pressed to order right in front of you - zero dilution.",
    live: "Squeezing in progress",
  },
  {
    id: "enjoy",
    number: "03",
    title: "Enjoy chilled",
    description:
      "Your sealed cup of chilled orange juice is ready in under a minute.",
    live: "Juice ready",
  },
];

function PayIcon({ active }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/18">
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
        <rect
          x="8"
          y="12"
          width="32"
          height="22"
          rx="4"
          stroke="#FFFAF6"
          strokeWidth="2.2"
        />
        <path d="M8 18h32" stroke="#FFFAF6" strokeWidth="2.2" />
        <motion.circle
          cx="30"
          cy="28"
          r="5"
          fill="#FFE0B8"
          animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <AnimatePresence>
        {active ? (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1F8A4C]"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path
                d="M3.5 8.2 6.4 11l6-6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SqueezeIcon({ active }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/18">
      <motion.div
        className="absolute inset-x-3 top-2 h-3 rounded-full bg-[#FFE0B8]/80"
        animate={active ? { y: [0, 22, 0], opacity: [0.7, 1, 0.7] } : { y: 0 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 32 32"
        className="relative z-[1] h-7 w-7"
        animate={active ? { scale: [1, 0.88, 1] } : { scale: 1 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <circle cx="16" cy="16" r="12" fill="#FFFAF6" />
        <circle cx="16" cy="16" r="9" fill="#FFE0B8" />
        <circle cx="16" cy="16" r="7.5" fill="#FFD4A8" />
        <path
          d="M16 16V9M16 16l5 5M16 16l-5 5M16 16h7"
          stroke="#EE6F28"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2" fill="#EE6F28" />
      </motion.svg>
      {active ? (
        <motion.span
          className="absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FFE0B8]"
          animate={{ y: [0, 8], opacity: [1, 0], scale: [1, 0.6] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
        />
      ) : null}
    </div>
  );
}

function ReadyIcon({ active }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/18">
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M16 14h16l-1.5 20a5 5 0 0 1-5 4.5h-3a5 5 0 0 1-5-4.5L16 14Z"
          stroke="#FFFAF6"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <motion.path
          d="M18.5 28c2 3 9 3 11 0"
          stroke="#FFE0B8"
          strokeWidth="2"
          strokeLinecap="round"
          animate={active ? { pathLength: [0.3, 1, 0.3] } : { pathLength: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      {active ? (
        <motion.span
          className="absolute -top-1 right-0 text-[10px] font-bold tracking-wide text-white"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          READY
        </motion.span>
      ) : null}
    </div>
  );
}

const icons = {
  pay: PayIcon,
  squeeze: SqueezeIcon,
  enjoy: ReadyIcon,
};

function StepCard({ step, active, index }) {
  const Icon = icons[step.id];

  return (
    <motion.article
      layout
      className={`relative overflow-hidden rounded-2xl border px-4 py-3 transition-[border-color,background-color,opacity] duration-500 ${
        active
          ? "border-white/25 bg-[#EE6F28]"
          : "border-white/10 bg-[#F07A32]/88"
      }`}
      animate={{
        opacity: active ? 1 : 0.78,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      {active ? (
        <motion.span
          layoutId="process-active-bar"
          className="absolute inset-y-0 left-0 w-1 bg-[#FFE0B8]"
        />
      ) : null}

      <div className="flex items-start gap-3">
        <Icon active={active} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFD4A8]">
              Step {step.number}
            </p>
            <AnimatePresence mode="wait">
              {active ? (
                <motion.span
                  key={step.live}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/18 px-2 py-0.5 text-[10px] font-semibold text-white"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A8F0C0]/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#A8F0C0]" />
                  </span>
                  {step.live}
                </motion.span>
              ) : (
                <span className="text-[10px] font-medium text-white/55">
                  0{index + 1} / 03
                </span>
              )}
            </AnimatePresence>
          </div>
          <h3 className="mt-1 text-[1rem] font-semibold tracking-[-0.02em] text-white md:text-[1.05rem]">
            {step.title}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white/80">
            {step.description}
          </p>

          {active && step.id === "pay" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2.5 rounded-xl bg-white/12 px-3 py-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-white/75">UPI / ****4821</span>
                <span className="font-semibold text-[#A8F0C0]">â‚¹80 paid</span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full bg-[#A8F0C0]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ) : null}

          {active && step.id === "squeeze" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2.5 rounded-xl bg-white/12 px-3 py-2"
            >
              <div className="flex items-center justify-between text-[11px] font-medium text-white/75">
                <span>Press cycle</span>
                <span className="text-[#FFE0B8]">Live</span>
              </div>
              <div className="mt-2 flex h-5 items-end gap-1">
                {[40, 70, 55, 85, 60, 90, 50].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-full rounded-sm bg-[#FFE0B8]/85"
                    animate={{ height: [`${h * 0.35}%`, `${h}%`, `${h * 0.45}%`] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    }}
                    style={{ height: `${h * 0.45}%` }}
                  />
                ))}
              </div>
            </motion.div>
          ) : null}

          {active && step.id === "enjoy" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2.5 rounded-xl bg-white/12 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-6 overflow-hidden rounded-b-lg rounded-t-sm border-2 border-white/35 bg-white/10">
                  <motion.div
                    className="absolute inset-x-0 bottom-0 bg-[#FFE0B8]"
                    initial={{ height: "15%" }}
                    animate={{ height: ["15%", "78%", "78%"] }}
                    transition={{
                      duration: 1.6,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 1.2,
                    }}
                  />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white">
                    Cup sealed / 4°C
                  </p>
                  <p className="text-[11px] text-white/70">Best within 1 hour</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

const sliceAccents = [
  {
    className: "left-[-4%] top-[18%] h-36 w-36 md:h-44 md:w-44",
    opacity: 0.2,
    delay: 0,
    rotate: [0, 10, -6, 0],
  },
  {
    className: "right-[-3%] top-[12%] h-32 w-32 md:h-40 md:w-40",
    opacity: 0.16,
    delay: 1.2,
    rotate: [0, -8, 10, 0],
  },
  {
    className: "bottom-[10%] left-[38%] h-28 w-28 md:h-36 md:w-36",
    opacity: 0.18,
    delay: 0.6,
    rotate: [0, 8, -10, 0],
  },
];

function SliceAccent({ blob, reduce }) {
  return (
    <motion.span
      aria-hidden
      className={`absolute ${blob.className}`}
      style={{ opacity: blob.opacity }}
      initial={false}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -8, 4, 0],
              x: [0, 6, -4, 0],
              rotate: blob.rotate,
            }
      }
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: blob.delay,
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
  );
}

export default function ProcessSteps() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section
      aria-labelledby="process-heading"
      className="relative flex flex-col overflow-hidden bg-white max-lg:py-12 lg:h-[100dvh] lg:max-h-[100dvh] lg:py-0"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {sliceAccents.map((blob, i) => (
          <SliceAccent key={i} blob={blob} reduce={reduce} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 py-0 md:px-8 lg:py-7">
        <div className="mx-auto max-w-2xl shrink-0 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            How it works
          </p>
          <h2
            id="process-heading"
            className="mt-1.5 text-[clamp(1.45rem,2.8vw,2.35rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink"
          >
            Fresh Orange Juice, Made Convenient
          </h2>
          <p className="mt-1.5 text-[14px] leading-snug text-muted md:text-[15px]">
            Seamless fully automated experience.
          </p>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 grid-rows-[auto_auto] items-center gap-5 lg:mt-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:grid-rows-1 lg:gap-8">
          <div className="relative mx-auto flex w-full max-w-[260px] items-center justify-center sm:max-w-sm lg:mx-0 lg:max-h-[78vh] lg:max-w-none">
            <Image
              src="/machine.png"
              alt="Orango juice vending machine showing tap and pay, fresh squeezing, and chilled juice dispense flow"
              width={1200}
              height={1400}
              className="h-auto max-h-[36vh] w-auto max-w-full object-contain sm:max-h-[42vh] lg:max-h-[78vh] lg:scale-[1.12]"
              sizes="(max-width: 1024px) 70vw, 48vw"
              priority
            />
          </div>

          <div className="flex min-h-0 flex-col justify-center gap-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(index)}
                className="w-full shrink-0 text-left"
                aria-pressed={active === index}
              >
                <StepCard step={step} active={active === index} index={index} />
              </button>
            ))}

            <div className="mt-1 flex items-center justify-center gap-2 lg:justify-start">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  aria-label={`Show step ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === index ? "w-8 bg-orange" : "w-1.5 bg-ink/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex shrink-0 flex-col items-center justify-center gap-3 pb-1 text-center sm:mt-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/shop"
            className="inline-flex w-full items-center justify-center rounded-full bg-orange px-7 py-2.5 text-[14px] font-semibold text-cream transition-colors duration-200 hover:bg-orange-deep sm:w-auto"
          >
            Place a juice machine
          </Link>
          <Link
            href="/vending-machine"
            className="text-[13px] font-medium text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            See the machine in detail
          </Link>
        </div>
      </div>
    </section>
  );
}
