"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import OrangeSliceDecor from "@/components/OrangeSliceDecor";
import FaqList from "@/components/FaqList";

const steps = [
  {
    n: "01",
    title: "Tap & pay",
    copy: "UPI on the glass. No tokens, no cashier, no stalled queue at the last step.",
  },
  {
    n: "02",
    title: "Watch the squeeze",
    copy: "A whole chilled Valencia orange becomes juice in front of the guest — theatre that builds trust.",
  },
  {
    n: "03",
    title: "Sealed & served",
    copy: "The cup closes itself. Cold, bright, collectible — usually in under a minute.",
  },
];

const stack = [
  {
    title: "Oranges at 4°C",
    copy: "Whole fruit rests in a chilled chamber so every pour starts cold — fruit and juice, never warm concentrate.",
  },
  {
    title: "UPI-native payments",
    copy: "Scan, pay, done. Conversion stays high because guests already know the flow.",
  },
  {
    title: "Scheduled self-cleaning",
    copy: "Hygiene intervals run on the machine — facilities is not babysitting a juicer between other jobs.",
  },
  {
    title: "Ozone sterilisation",
    copy: "An extra sanitation layer built for public-space trust — the kind procurement actually asks about.",
  },
  {
    title: "Sealed at dispense",
    copy: "The cup closes the moment it is filled, locking in vitamin C and keeping hands off the drink.",
  },
  {
    title: "Live operations data",
    copy: "Stock, throughput, and replenishment signals so a network of machines runs like a real operation.",
  },
];

const benefits = [
  {
    title: "Vitamin C that shows up",
    copy: "One cup covers a meaningful daily vitamin C intake — a clean claim next to a gym or clinic.",
  },
  {
    title: "Energy without the crash",
    copy: "Natural fruit sugars plus hydration — the afternoon alternative to a third espresso or soda.",
  },
  {
    title: "Zero additives",
    copy: "No added sugar. No preservatives. No reconstituted pulp. What you watch squeezed is what you drink.",
  },
  {
    title: "Immunity-friendly ritual",
    copy: "Antioxidants and a chilled pour people already understand — without syrup marketing.",
  },
];

const specs = [
  { label: "Serve time", value: "~45 sec" },
  { label: "Fruit", value: "Valencia" },
  { label: "Temp", value: "4°C store" },
  { label: "Pay", value: "UPI first" },
  { label: "Cup", value: "Auto-seal" },
  { label: "Clean", value: "Self + ozone" },
];

export default function VendingMachineContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative w-full max-w-full overflow-x-clip bg-[#FFFAF6]">
      <LiveBlobs />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-8 pt-[calc(var(--nav-h)+1.5rem)] sm:px-5 sm:pb-10 sm:pt-[calc(var(--nav-h)+2rem)] md:px-8 md:pb-14 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
              Vending Machine
            </p>
            <h1 className="mt-2.5 max-w-xl text-[clamp(1.75rem,7.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410] sm:mt-3">
              Fresh orange juice. Squeezed to order. Built for public floors.
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#8B3410]/70 sm:mt-5 sm:text-[16px]">
              OranGo is a smart juice machine engineered for hospitals, offices,
              malls, and gyms — chilled Valencia oranges, UPI pay, ozone hygiene,
              and a sealed cup guests can trust in under a minute.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
              >
                Request a site survey
              </Link>
              <Link
                href="/business-opportunity"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#8B3410]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#8B3410] transition-colors hover:border-[#EE6F28]/40 sm:w-auto"
              >
                See partnership models
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <OrangeSliceDecor
              className="-left-10 -top-8 hidden h-64 w-64 sm:block md:h-80 md:w-80"
              opacity={0.18}
              rotate={-12}
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#EE6F28]/12 bg-[#FFF5ED] px-4 pb-0 pt-6 sm:rounded-[2rem] sm:px-6 sm:pt-8 md:px-10 md:pt-10">
              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                {["4°C fruit", "UPI", "Ozone", "Auto-seal"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#EE6F28] sm:px-3 sm:text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Image
                src="/machine.png"
                alt="Orango automated fresh orange juice vending machine"
                width={520}
                height={640}
                className="mx-auto h-auto w-full max-w-[240px] object-contain drop-shadow-[0_24px_48px_rgba(238,111,40,0.18)] sm:max-w-[320px]"
                priority
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {specs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.04 }}
              className="rounded-[1rem] border border-[#8B3410]/8 bg-white px-3.5 py-3 sm:rounded-[1.15rem] sm:px-4 sm:py-3.5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B3410]/45 sm:text-[11px]">
                {item.label}
              </p>
              <p className="mt-1 text-[14px] font-semibold text-[#8B3410] sm:text-[15px]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="mb-5 max-w-2xl sm:mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
            How it works
          </p>
          <h2 className="mt-2 text-[clamp(1.5rem,6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#8B3410]">
            Three steps. Zero café friction.
          </h2>
        </div>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-[1.35rem] p-5 sm:rounded-[1.6rem] sm:p-7 md:p-8 ${
                i === 1
                  ? "bg-[#EE6F28] text-white"
                  : "border border-[#8B3410]/8 bg-white text-[#8B3410]"
              }`}
            >
              <p
                className={`text-[11px] font-semibold tracking-[0.18em] sm:text-[12px] ${
                  i === 1 ? "text-white/80" : "text-[#EE6F28]"
                }`}
              >
                {step.n}
              </p>
              <h3 className="mt-2.5 text-[1.2rem] font-semibold tracking-[-0.02em] sm:mt-3 sm:text-[1.35rem]">
                {step.title}
              </h3>
              <p
                className={`mt-2 text-[13px] leading-relaxed sm:text-[14px] ${
                  i === 1 ? "text-white/85" : "text-[#8B3410]/65"
                }`}
              >
                {step.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Machine stack */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[1.6rem] bg-[#EE6F28] px-5 py-8 text-white sm:rounded-[2rem] sm:px-7 sm:py-10 md:px-12 md:py-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C] sm:text-[12px]">
            Machine stack
          </p>
          <h2 className="mt-2.5 max-w-3xl text-[clamp(1.4rem,5.5vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] sm:mt-3">
            Hygiene you can brief. Payments guests already know.
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-white/70 sm:mt-4 sm:text-[15px]">
            A public juicer only works when facilities, procurement, and guests
            all believe it. OranGo is engineered around that three-way handshake.
          </p>
          <div className="mt-7 grid gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {stack.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-[1.15rem] border border-white/10 bg-white/5 p-4 sm:rounded-[1.25rem] sm:p-5"
              >
                <h3 className="text-[1rem] font-semibold sm:text-[1.05rem]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/65 sm:mt-2 sm:text-[13px]">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why guests come back */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-4">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
              Why guests come back
            </p>
            <h2 className="mt-2 text-[clamp(1.4rem,5.5vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#8B3410]">
              A cup that earns its place next to coffee and cola.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#8B3410]/65 sm:mt-4 sm:text-[15px]">
              We are not fighting caffeine culture — we are giving high-footfall
              floors a healthier default that is just as convenient.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:mt-8 sm:w-auto"
            >
              Place a machine
            </Link>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:col-span-8">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[1.25rem] border border-[#8B3410]/8 bg-white p-5 sm:rounded-[1.35rem] sm:p-6"
              >
                <h3 className="text-[1.05rem] font-semibold text-[#8B3410] sm:text-[1.1rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8B3410]/65 sm:text-[14px]">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for operators */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#FFF5ED] p-6 sm:rounded-[2rem] sm:p-8 md:p-10">
            <OrangeSliceDecor
              className="-right-6 -top-6 hidden h-36 w-36 sm:block md:h-44 md:w-44"
              opacity={0.18}
              rotate={14}
            />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28] sm:text-[12px]">
              Built for operators
            </p>
            <h2 className="relative mt-2.5 text-[clamp(1.35rem,5vw,2.2rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-[#8B3410] sm:mt-3">
              Less café build-out. More predictable pours.
            </h2>
            <ul className="relative mt-5 space-y-2.5 text-[13px] leading-relaxed text-[#8B3410]/75 sm:mt-6 sm:space-y-3 sm:text-[14px]">
              {[
                "No wet kitchen or barista roster required",
                "Footprint planned for circulation, not a stall",
                "Replenishment cadence designed into the network",
                "Hygiene story facilities and procurement can defend",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE6F28]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex min-h-[220px] items-end justify-center overflow-hidden rounded-[1.5rem] bg-[#EE6F28] px-5 pt-6 sm:min-h-[280px] sm:rounded-[2rem] sm:px-6 sm:pt-8">
            <Image
              src="/jar.png"
              alt="Fresh sealed cup of orange juice"
              width={280}
              height={320}
              className="h-auto w-full max-w-[180px] object-contain sm:max-w-[220px]"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-8 sm:px-5 sm:pb-10 md:px-8">
        <div className="rounded-[1.5rem] border border-[#8B3410]/8 bg-white px-5 py-8 sm:rounded-[2rem] sm:px-7 sm:py-10 md:px-12 md:py-12">
          <h2 className="text-[clamp(1.35rem,5vw,2.2rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
            Questions operators actually ask
          </h2>
          <div className="mt-6 sm:mt-8">
            <FaqList />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-14 sm:px-5 sm:pb-20 md:px-8 md:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[1.6rem] bg-[#EE6F28] px-5 py-10 text-white sm:rounded-[2rem] sm:px-7 sm:py-12 md:px-12 md:py-14"
        >
          <OrangeSliceDecor
            className="-right-10 top-0 hidden h-48 w-48 sm:block md:h-56 md:w-56"
            opacity={0.2}
            rotate={18}
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.4rem,5.5vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
                Ready to put fresh juice on your floor?
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
                Tell us the site type, footfall, and city. We will map footprint,
                hygiene brief, and a realistic rollout path.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#8B3410] transition-colors hover:bg-[#FFF5ED] sm:w-auto"
              >
                Talk to Orango
              </Link>
              <Link
                href="/business-opportunity"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/45 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Business opportunity
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
