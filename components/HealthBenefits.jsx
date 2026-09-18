"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import OrangeSliceDecor from "./OrangeSliceDecor";

const benefits = [
  {
    kicker: "Hero nutrient",
    title: "Vitamin C",
    copy: "Fresh Valencia oranges — a bright daily dose of vitamin C in every sealed cup.",
    tone: "orange",
    image: "/benefits/benefit-vitamin-c.png",
  },
  {
    kicker: "Daily",
    title: "Immunity support",
    copy: "Pure juice with naturally occurring antioxidants. No syrup. No shortcuts.",
    tone: "cream",
    image: "/benefits/benefit-immunity.png",
  },
  {
    kicker: "Afternoon",
    title: "Energy boost",
    copy: "Clean fruit fuel for the 4pm dip — without the crash of sugary sodas.",
    tone: "white",
    image: "/benefits/benefit-energy.png",
  },
  {
    kicker: "Everyday",
    title: "Heart-wise hydration",
    copy: "Potassium-forward electrolytes and chilled pours that support daily wellness.",
    tone: "orange",
    image: "/benefits/benefit-heart.png",
  },
  {
    kicker: "Freshness",
    title: "Skin wellness",
    copy: "Citrus antioxidants and hydration — not reconstituted concentrate.",
    tone: "cream",
    image: "/benefits/benefit-skin.png",
  },
  {
    kicker: "Promise",
    title: "Zero additives",
    copy: "No added sugar. No preservatives. What you watch squeezed is what you drink.",
    tone: "white",
    image: "/benefits/benefit-pure.png",
  },
];

const toneClass = {
  orange: "bg-[#EE6F28] text-white border border-[#EE6F28]",
  cream: "bg-[#FFF5ED] text-[#8B3410] border border-[#EE6F28]/15",
  white: "bg-white text-[#8B3410] border border-[#EE6F28]/15",
};

const copyClass = {
  orange: "text-white/80",
  cream: "text-[#8B3410]/65",
  white: "text-[#8B3410]/65",
};

const kickerClass = {
  orange: "text-[#FFE0B8]",
  cream: "text-[#EE6F28]",
  white: "text-[#EE6F28]",
};

const STACK_GAP = 22;
const ENTER_Y = 380;

function BenefitCard({ item, index, total, progress, reduce }) {
  // Card 0 is already in place when sticky locks; remaining cards enter on scroll.
  const steps = Math.max(total - 1, 1);

  const y = useTransform(progress, (p) => {
    if (reduce || index === 0) return index * STACK_GAP;
    const current = p * steps;
    if (current < index - 1) return ENTER_Y;
    if (current < index) {
      const t = current - (index - 1);
      return ENTER_Y * (1 - t) + index * STACK_GAP * t;
    }
    return index * STACK_GAP;
  });

  const scale = useTransform(progress, (p) => {
    if (reduce) return 1 - (total - index - 1) * 0.035;
    const current = p * steps;
    if (current <= index) return 1;
    const depth = Math.min(current - index, total - index - 1);
    return 1 - depth * 0.035;
  });

  const opacity = useTransform(progress, (p) => {
    if (reduce || index === 0) return 1;
    const current = p * steps;
    if (current < index - 1 - 0.12) return 0;
    if (current < index - 1) {
      return (current - (index - 1 - 0.12)) / 0.12;
    }
    return 1;
  });

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: index + 1 }}
      className={`absolute inset-x-0 top-0 mx-auto flex min-h-[16.5rem] max-w-3xl flex-col justify-between gap-5 overflow-hidden rounded-[1.75rem] p-6 shadow-[0_18px_40px_rgba(238,111,40,0.14)] will-change-transform md:min-h-[18.5rem] md:flex-row md:items-center md:gap-10 md:rounded-[2rem] md:p-8 ${toneClass[item.tone]}`}
    >
      <div className="min-w-0 flex-1">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${kickerClass[item.tone]}`}
        >
          {item.kicker}
        </p>
        <h3 className="mt-2 text-[clamp(1.55rem,3vw,2.25rem)] font-semibold tracking-[-0.03em]">
          {item.title}
        </h3>
        <p
          className={`mt-3 max-w-lg text-[15px] leading-relaxed md:text-[16px] ${copyClass[item.tone]}`}
        >
          {item.copy}
        </p>
      </div>
      <div className="relative mx-auto h-36 w-36 shrink-0 md:mx-0 md:h-44 md:w-44">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-contain drop-shadow-[0_12px_24px_rgba(139,52,16,0.18)]"
          sizes="176px"
        />
      </div>
    </motion.article>
  );
}

export default function HealthBenefits() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const total = benefits.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={trackRef}
      aria-labelledby="benefits-heading"
      className="relative bg-[#FFFAF6]"
      style={{ height: `${Math.max(total, 1) * 100}vh` }}
    >
      <div className="sticky top-[88px] flex h-[calc(100svh-88px)] flex-col overflow-hidden lg:top-[96px] lg:h-[calc(100svh-96px)]">
        <OrangeSliceDecor
          className="-left-10 top-10 h-36 w-36 md:h-44 md:w-44"
          opacity={0.14}
          rotate={-16}
        />
        <OrangeSliceDecor
          className="-right-12 bottom-16 h-40 w-40 md:h-48 md:w-48"
          opacity={0.12}
          rotate={18}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] shrink-0 items-end justify-between gap-3 px-5 pb-3 pt-6 md:px-8 md:pt-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
              OranGo Benefits
            </p>
            <h2
              id="benefits-heading"
              className="mt-1.5 text-[clamp(1.55rem,2.8vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#8B3410]"
            >
              Health Benefits
            </h2>
            <p className="mt-1 text-[14px] text-[#8B3410]/6">
              Keep scrolling — each benefit stacks on the last.
            </p>
          </div>
          <Link
            href="/vending-machine"
            className="hidden items-center justify-center rounded-full bg-[#EE6F28] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:inline-flex"
          >
            Explore the machine
          </Link>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-start px-5 pb-8 pt-2 md:px-8">
          <div className="relative mx-auto h-[min(420px,52svh)] w-full md:h-[min(460px,56svh)]">
            {benefits.map((item, index) => (
              <BenefitCard
                key={item.title}
                item={item}
                index={index}
                total={total}
                progress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
