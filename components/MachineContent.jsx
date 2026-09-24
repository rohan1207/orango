"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import OrangeSliceDecor from "@/components/OrangeSliceDecor";
import FaqList from "@/components/FaqList";
import {
  brand,
  machineSpecs,
  primaryCta,
  secondaryCta,
} from "@/lib/site";

const journey = [
  {
    n: "01",
    title: "Tap & pay",
    copy: "UPI on the glass. No tokens, no cashier — pay and the cycle starts.",
  },
  {
    n: "02",
    title: "Watch it squeeze",
    copy: "A chilled Valencia orange is squeezed in front of you — untouched by hand.",
  },
  {
    n: "03",
    title: "Take a sealed cup",
    copy: "About 45 seconds later: cold juice in a sealed cup, ready to go.",
  },
];

const hygiene = [
  {
    title: "Stored at 4°C",
    copy: "Whole fruit rests in a chilled chamber so every pour starts cold.",
  },
  {
    title: "Ozone cleaned",
    copy: "Fruit path sterilisation built for public-space trust.",
  },
  {
    title: "Sealed cup",
    copy: "The cup closes at dispense — hygienic for malls and hospitals.",
  },
  {
    title: "No sugar · no preservatives",
    copy: "100% Valencia orange juice. What you watch squeezed is what you drink.",
  },
];

export default function MachineContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative w-full max-w-full overflow-x-clip bg-[#FFFAF6]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-8 pt-[calc(var(--nav-h)+1.5rem)] sm:px-5 sm:pb-10 sm:pt-[calc(var(--nav-h)+2rem)] md:px-8 md:pb-14 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
              The Machine
            </p>
            <h1 className="mt-2.5 max-w-xl text-[clamp(1.75rem,7.5vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410] sm:mt-3">
              Fresh orange juice, squeezed in 45 seconds.
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#8B3410]/70 sm:mt-5 sm:text-[16px]">
              Automated cabinet for Indian malls, hospitals, offices, and gyms.
              Valencia oranges at 4°C. UPI. Ozone. Sealed cup from {brand.priceFrom}.
              Built so facilities teams can screenshot the specs into WhatsApp.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                href={primaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
              >
                {primaryCta.label}
              </Link>
              <a
                href="#specs"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#8B3410]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#8B3410] transition-colors hover:border-[#EE6F28]/40 sm:w-auto"
              >
                View specs
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <OrangeSliceDecor
              className="-left-8 -top-6 hidden h-56 w-56 sm:block md:h-72 md:w-72"
              opacity={0.2}
              rotate={-12}
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#8B3410]/8 bg-white p-4 shadow-[0_20px_50px_-28px_rgba(139,52,16,0.35)] sm:rounded-[2rem] sm:p-6">
              <Image
                src="/machine.png"
                alt="OranGo automated orange juice vending machine cabinet"
                width={900}
                height={1100}
                className="mx-auto h-auto w-full max-w-md object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
          How it works
        </p>
        <h2 className="mt-2 max-w-2xl text-[clamp(1.5rem,4vw,2.4rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
          Tap &amp; pay → watch it squeeze → take a sealed cup.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {journey.map((step) => (
            <div
              key={step.n}
              className="rounded-[1.5rem] border border-[#8B3410]/8 bg-white p-6"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EE6F28]">
                {step.n}
              </p>
              <h3 className="mt-2 text-[20px] font-semibold text-[#8B3410]">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#8B3410]/70">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="specs"
        className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 md:px-8 md:py-14"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Spec strip
            </p>
            <h2 className="mt-2 text-[clamp(1.5rem,4vw,2.4rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
              What facilities teams need to know
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#8B3410]/70">
              Roughly 12 sq. ft., a power point, and loading access. OranGo
              installs, restocks fruit and cups, and cleans. You host the bay.
            </p>
            <Link
              href={primaryCta.href}
              className="mt-6 inline-flex rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#D45A18]"
            >
              Book a site survey
            </Link>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-[#8B3410]/8 bg-white">
            <table className="w-full text-left text-[14px]">
              <tbody>
                {machineSpecs.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-[#FFFAF6]" : "bg-white"}
                  >
                    <th className="px-5 py-3.5 font-semibold text-[#8B3410]/55">
                      {row.label}
                    </th>
                    <td className="px-5 py-3.5 font-medium text-[#8B3410]">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
          Hygiene &amp; health
        </p>
        <h2 className="mt-2 max-w-2xl text-[clamp(1.5rem,4vw,2.4rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
          Built for public spaces — including hospitals
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#8B3410]/65">
          Nutrition claims describe typical Valencia orange juice. This is not a
          medical claim. Always follow local hospital or venue guidelines.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hygiene.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.35rem] border border-[#8B3410]/8 bg-white p-5"
            >
              <h3 className="text-[16px] font-semibold text-[#8B3410]">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8B3410]/70">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 md:px-8 md:py-16">
        <div className="rounded-[2rem] border border-[#8B3410]/8 bg-white p-6 sm:p-10 md:p-12">
          <h2 className="text-[clamp(1.4rem,3.5vw,2.1rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
            Machine FAQ
          </h2>
          <div className="mt-6">
            <FaqList />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#D45A18]"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-[#8B3410]/15 px-6 py-3 text-[14px] font-semibold text-[#8B3410]"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
