"use client";

/**
 * Hero3 — sticky multi-step story (reliable scroll lock).
 *
 * Approach: tall scroll track + sticky panel under the navbar.
 * Scroll progress through the track maps 1:1 to steps 0–4.
 * No wheel preventDefault → no hangs / stuck scroll.
 * Forward + reverse are the same path. Touch works natively.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const DEFAULT_STEPS = [
  {
    id: "pure",
    index: "01",
    eyebrow: "The OranGo promise",
    title: "OranGo — 100% pure &\nfreshly squeezed orange juice",
    titleMobile: "100% pure & freshly squeezed",
    lead: "Not from concentrate. Not from a carton. Real Valencia oranges, pressed into a sealed cup — bright, honest, and made for how India drinks fresh.",
    leadMobile:
      "Real Valencia oranges pressed into a sealed cup — not from concentrate.",
    points: [
      "100% Valencia oranges — nothing else in the cup",
      "No sugar, no preservatives, no artificial flavour",
      "Vitamin-rich juice you can trust at a glance",
      "Built for malls, hospitals, offices and gyms",
    ],
    pointsMobile: [
      "100% Valencia oranges only",
      "No sugar or preservatives",
      "Built for high-footfall venues",
    ],
    image: "/step1.png",
    imageAlt: "OranGo vending machine — complete unit",
    imageFit: "contain",
    accent: "Pure. Fresh. Yours.",
  },
  {
    id: "upi",
    index: "02",
    eyebrow: "Pay in seconds",
    title: "Easy UPI payment.\nNo tokens. No cashier.",
    titleMobile: "Easy UPI payment",
    lead: "Walk up, tap your UPI app, and the machine takes it from there. Zero friction for guests — zero cash handling for your site.",
    leadMobile: "Tap UPI and go — no tokens, no cashier, no cash handling.",
    points: [
      "UPI-first checkout — familiar and instant",
      "No tokens, cards, or staff at the machine",
      "Clear on-screen prompts every step of the way",
      "Designed for high-footfall Indian venues",
    ],
    pointsMobile: [
      "UPI-first — familiar and instant",
      "No tokens or staff needed",
      "Clear on-screen prompts",
    ],
    image: "/step2.png",
    imageAlt: "OranGo easy UPI payment",
    imageFit: "contain",
    accent: "Tap. Pay. Squeeze.",
  },
  {
    id: "oranges",
    index: "03",
    eyebrow: "The fruit",
    title: "Fresh Valencia oranges —\nhand-picked & washed",
    titleMobile: "Hand-picked Valencia oranges",
    lead: "We start with Valencia oranges chosen for juice yield and flavour, then wash and chill them so every cup begins with fruit that looks — and tastes — ready.",
    leadMobile:
      "Hand-picked, washed, and chilled Valencia oranges — freshness you can see.",
    points: [
      "Hand-picked Valencia oranges for juicing",
      "Washed and held chilled before the squeeze",
      "Visible fruit window — freshness you can see",
      "Consistent quality cup after cup",
    ],
    pointsMobile: [
      "Hand-picked for juicing",
      "Washed and chilled",
      "Visible fruit window",
    ],
    image: "/step3.png",
    imageAlt: "Fresh Valencia oranges hand-picked and washed",
    imageFit: "contain",
    accent: "Fruit first. Always.",
  },
  {
    id: "squeeze",
    index: "04",
    eyebrow: "In front of you",
    title: "Freshly squeezed\nbefore your eyes",
    titleMobile: "Squeezed before your eyes",
    lead: "Watch the press happen live. No additives. No syrups. No hidden blend — just oranges becoming juice in a clean, automated path.",
    leadMobile:
      "Watch it press live — no additives, no syrups, nothing hidden.",
    points: [
      "Squeezed live — not poured from a tank",
      "No additives, colours, or preservatives",
      "Hygienic automated path, sealed at dispense",
      "The theatre of fresh juice, without the café wait",
    ],
    pointsMobile: [
      "Squeezed live, not from a tank",
      "No additives or colours",
      "Sealed at dispense",
    ],
    image: "/step4.png",
    imageAlt: "OranGo freshly squeezing oranges",
    imageFit: "contain",
    accent: "Nothing added. Nothing hidden.",
  },
  {
    id: "ready",
    index: "05",
    eyebrow: "Ready to go",
    title: "Fresh chilled juice\nin about 45 seconds",
    titleMobile: "Ready in about 45 seconds",
    lead: "From payment to sealed cup in roughly forty-five seconds — cold, bright, and ready to walk with. Fresh juice that fits real life.",
    leadMobile:
      "Payment to sealed cup in about 45 seconds — cold, bright, grab and go.",
    points: [
      "About 45 seconds, start to finish",
      "Chilled, sealed cup — grab and go",
      "Consistent taste at every machine",
      "From ₹120 — premium fresh, everyday easy",
    ],
    pointsMobile: [
      "About 45 seconds end to end",
      "Chilled sealed cup",
      "From ₹120",
    ],
    image: "/step5.png",
    imageAlt: "Fresh chilled orange juice ready",
    imageFit: "contain",
    accent: "45 seconds. Sealed. Fresh.",
  },
];

/** 4-step variant for /home2 — combines old steps 3+4, uses /public/home2 images */
export const HOME2_STEPS = [
  {
    id: "pure",
    index: "01",
    eyebrow: "The OranGo promise",
    title: "OranGo — 100% pure &\nfreshly squeezed orange juice",
    titleMobile: "100% pure & freshly squeezed",
    lead: "Not from concentrate. Not from a carton. Real Valencia oranges, pressed into a sealed cup — bright, honest, and made for how India drinks fresh.",
    leadMobile:
      "Real Valencia oranges pressed into a sealed cup — not from concentrate.",
    points: [
      "100% Valencia oranges — nothing else in the cup",
      "No sugar, no preservatives, no artificial flavour",
      "Vitamin-rich juice you can trust at a glance",
      "Built for malls, hospitals, offices and gyms",
    ],
    pointsMobile: [
      "100% Valencia oranges only",
      "No sugar or preservatives",
      "Built for high-footfall venues",
    ],
    image: "/home2/machine.png",
    imageAlt: "OranGo vending machine — complete unit",
    imageFit: "contain",
    accent: "Pure. Fresh. Yours.",
  },
  {
    id: "upi",
    index: "02",
    eyebrow: "Pay in seconds",
    title: "Easy UPI payment.\nNo tokens. No cashier.",
    titleMobile: "Easy UPI payment",
    lead: "Walk up, tap your UPI app, and the machine takes it from there. Zero friction for guests — zero cash handling for your site.",
    leadMobile: "Tap UPI and go — no tokens, no cashier, no cash handling.",
    points: [
      "UPI-first checkout — familiar and instant",
      "No tokens, cards, or staff at the machine",
      "Clear on-screen prompts every step of the way",
      "Designed for high-footfall Indian venues",
    ],
    pointsMobile: [
      "UPI-first — familiar and instant",
      "No tokens or staff needed",
      "Clear on-screen prompts",
    ],
    image: "/home2/Screen.png",
    imageAlt: "OranGo easy UPI payment screen",
    imageFit: "contain",
    accent: "Tap. Pay. Squeeze.",
  },
  {
    id: "fruit-squeeze",
    index: "03",
    eyebrow: "The fruit & the press",
    title: "Hand-picked Valencia oranges,\nfreshly squeezed before your eyes",
    titleMobile: "Oranges squeezed before your eyes",
    lead: "We start with hand-picked Valencia oranges — washed, chilled, and held in a visible fruit window. Then watch the press happen live: no additives, no syrups, just oranges becoming juice in a clean, automated path.",
    leadMobile:
      "Hand-picked, washed oranges — then squeezed live before you. No additives, nothing hidden.",
    points: [
      "Hand-picked Valencia oranges for juicing",
      "Washed and held chilled — freshness you can see",
      "Squeezed live — not poured from a tank",
      "Hygienic automated path, sealed at dispense",
    ],
    pointsMobile: [
      "Hand-picked, washed & chilled",
      "Squeezed live before you",
      "No additives — sealed at dispense",
    ],
    image: "/home2/inside.png",
    imageAlt: "Fresh Valencia oranges being squeezed inside the OranGo machine",
    imageFit: "contain",
    accent: "Fruit first. Nothing hidden.",
  },
  {
    id: "ready",
    index: "04",
    eyebrow: "Ready to go",
    title: "Fresh chilled juice\nin about 45 seconds",
    titleMobile: "Ready in about 45 seconds",
    lead: "From payment to sealed cup in roughly forty-five seconds — cold, bright, and ready to walk with. Fresh juice that fits real life.",
    leadMobile:
      "Payment to sealed cup in about 45 seconds — cold, bright, grab and go.",
    points: [
      "About 45 seconds, start to finish",
      "Chilled, sealed cup — grab and go",
      "Consistent taste at every machine",
      "From ₹120 — premium fresh, everyday easy",
    ],
    pointsMobile: [
      "About 45 seconds end to end",
      "Chilled sealed cup",
      "From ₹120",
    ],
    image: "/home2/juice glass.png",
    imageAlt: "Fresh chilled orange juice ready in a sealed cup",
    imageFit: "contain",
    accent: "45 seconds. Sealed. Fresh.",
  },
];

/** ~124vh per step (620vh baseline for 5 steps) */
function trackVhForStepCount(stepCount) {
  return Math.round(620 * (stepCount / 5));
}

const sliceAccents = [
  {
    className: "left-[-8%] top-[22%] h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44",
    opacity: 0.18,
    delay: 0,
    rotate: [0, 10, -6, 0],
  },
  {
    className:
      "right-[-6%] top-[8%] h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:right-[-3%]",
    opacity: 0.15,
    delay: 1.1,
    rotate: [0, -8, 10, 0],
  },
  {
    className:
      "bottom-[6%] left-[42%] h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 max-sm:left-[8%] max-sm:bottom-[38%]",
    opacity: 0.16,
    delay: 0.55,
    rotate: [0, 8, -10, 0],
  },
];

const imageVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 28 : -28,
    scale: 0.98,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -22 : 22,
    scale: 0.99,
  }),
};

const copyVariants = {
  enter: (dir) => ({
    opacity: 0,
    y: dir > 0 ? 18 : -18,
  }),
  center: { opacity: 1, y: 0 },
  exit: (dir) => ({
    opacity: 0,
    y: dir > 0 ? -14 : 14,
  }),
};

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

function progressToStep(progress, stepCount) {
  // Equal bands with hysteresis-friendly midpoints — never skip a band
  const p = Math.min(1, Math.max(0, progress));
  const idx = Math.min(stepCount - 1, Math.floor(p * stepCount + 1e-6));
  return idx;
}

export default function Hero3({
  anchorId = "home-scroll-hero",
  steps = DEFAULT_STEPS,
}) {
  const stepCount = steps.length;
  const trackVh = trackVhForStepCount(stepCount);
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [locked, setLocked] = useState(false);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let ticking = false;

    const sync = () => {
      ticking = false;
      try {
        const rect = track.getBoundingClientRect();
        const navRaw = getComputedStyle(document.documentElement)
          .getPropertyValue("--nav-h")
          .trim();
        const navH = Number.parseFloat(navRaw) || 72;
        const panelH = Math.max(1, window.innerHeight - navH);

        // Sticky travel distance = track height − sticky panel height
        const travel = Math.max(1, track.offsetHeight - panelH);
        // When panel is pinned under nav, rect.top ≈ navH
        const scrolled = Math.min(travel, Math.max(0, navH - rect.top));
        const progress = scrolled / travel;

        // Locked while sticky panel is filling the space under the navbar
        const isLocked =
          rect.top <= navH + 2 && rect.bottom >= navH + panelH - 2;
        setLocked(isLocked);

        const next = progressToStep(progress, stepCount);
        if (next !== stepRef.current) {
          setDirection(next > stepRef.current ? 1 : -1);
          stepRef.current = next;
          setStep(next);
        }
      } catch {
        /* ignore */
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
    };
  }, [stepCount]);

  const current = steps[step];
  const duration = reduce ? 0.18 : 0.5;
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section
      ref={trackRef}
      className="relative w-full bg-[#FFFAF6]"
      style={{ height: `${trackVh}vh` }}
      aria-label="OranGo product story"
    >
      {/* Sticky panel — sits under navbar, never cropped by it */}
      <div
        id={anchorId || undefined}
        className="sticky z-10 w-full overflow-hidden bg-[#FFFAF6]"
        style={{
          top: "var(--nav-h)",
          height: "calc(100dvh - var(--nav-h))",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 18% 45%, rgba(238,111,40,0.12), transparent 58%), radial-gradient(ellipse 50% 40% at 88% 20%, rgba(238,111,40,0.07), transparent 55%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {sliceAccents.map((blob, i) => (
            <SliceAccent key={i} blob={blob} reduce={reduce} />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-4 py-4 sm:px-5 sm:py-5 md:px-8 lg:flex-row lg:items-center lg:gap-10 lg:py-6 xl:gap-14">
          {/* Image */}
          <div className="relative flex min-h-0 shrink-0 items-center justify-center max-lg:h-[min(34dvh,260px)] sm:max-lg:h-[min(38dvh,320px)] lg:h-full lg:flex-[1.05]">
            <div className="relative flex h-full w-full max-w-[200px] items-center justify-center sm:max-w-[280px] md:max-w-[360px] lg:max-h-full lg:max-w-none lg:w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration, ease }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    width={900}
                    height={1100}
                    priority={step === 0}
                    sizes="(max-width: 1024px) 70vw, 48vw"
                    className={`h-full w-auto max-w-full rounded-3xl object-center ${
                      current.imageFit === "cover"
                        ? "object-cover"
                        : "object-contain"
                    }`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Copy */}
          <div className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden pt-1 lg:max-w-[520px] lg:overflow-visible lg:pt-0 xl:max-w-[560px]">
            <div className="mb-2 flex items-center gap-3 sm:mb-4">
              <span className="font-display text-[12px] font-semibold tracking-[0.2em] text-[#EE6F28] sm:text-[13px]">
                {current.index}
              </span>
              <span className="h-px flex-1 bg-[#EE6F28]/25" />
              <span className="text-[11px] font-medium text-[#8B3410]/45 sm:text-[12px]">
                {String(stepCount).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id + "-copy"}
                custom={direction}
                variants={copyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration, ease }}
                className="flex min-h-0 flex-col"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[11px]">
                  {current.eyebrow}
                </p>

                <h2 className="mt-2 text-[clamp(1.3rem,5vw,1.65rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-[#8B3410] sm:mt-3 sm:text-[clamp(1.5rem,3vw,2.6rem)] sm:leading-[1.12]">
                  <span className="lg:hidden">{current.titleMobile}</span>
                  <span className="hidden whitespace-pre-line lg:inline">
                    {current.title}
                  </span>
                </h2>

                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#8B3410]/75 sm:mt-3.5 sm:text-[15px] md:text-[16px]">
                  <span className="lg:hidden">{current.leadMobile}</span>
                  <span className="hidden lg:inline">{current.lead}</span>
                </p>

                <ul className="mt-3 space-y-2 border-t border-[#EE6F28]/15 pt-3 sm:mt-5 sm:space-y-3 sm:pt-4">
                  {current.pointsMobile.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[12.5px] leading-snug text-[#8B3410]/85 lg:hidden"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE6F28]"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                  {current.points.map((point) => (
                    <li
                      key={point}
                      className="hidden gap-3 text-[14px] leading-snug text-[#8B3410]/85 md:text-[15px] lg:flex"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE6F28]"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-[12px] font-semibold tracking-wide text-[#EE6F28] sm:mt-5 sm:text-[13px] md:text-[14px]">
                  {current.accent}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-3.5 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4">
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Story steps"
              >
                {steps.map((s, i) => (
                  <span
                    key={s.id}
                    role="tab"
                    aria-selected={i === step}
                    aria-label={`Step ${i + 1}: ${s.eyebrow}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === step
                        ? "w-7 bg-[#EE6F28] sm:w-8"
                        : "w-1.5 bg-[#8B3410]/20"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#8B3410]/40 sm:text-[11px]">
                {locked
                  ? step < stepCount - 1
                    ? "Scroll for next"
                    : "Scroll to continue"
                  : "Keep scrolling"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
