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
    <article className="relative overflow-hidden bg-[#F7FBFA]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-10 pt-[calc(var(--nav-h)+2.5rem)] md:px-8 md:pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Vending Machine
            </p>
            <h1 className="mt-3 max-w-xl text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#0F3D37]">
              Fresh orange juice. Squeezed to order. Built for public floors.
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#0F3D37]/70">
              OranGo is a smart juice machine engineered for hospitals, offices,
              malls, and gyms — chilled Valencia oranges, UPI pay, ozone hygiene,
              and a sealed cup guests can trust in under a minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
              >
                Request a site survey
              </Link>
              <Link
                href="/business-opportunity"
                className="inline-flex items-center justify-center rounded-full border border-[#0F3D37]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#0F3D37] transition-colors hover:border-[#EE6F28]/40"
              >
                See partnership models
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative"
          >
            <OrangeSliceDecor
              className="-left-10 -top-8 h-64 w-64 md:h-80 md:w-80"
              opacity={0.18}
              rotate={-12}
            />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0F3D37] px-6 pb-0 pt-8 md:px-10 md:pt-10">
              <div className="mb-4 flex flex-wrap gap-2">
                {["4°C fruit", "UPI", "Ozone", "Auto-seal"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90"
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
                className="mx-auto h-auto w-full max-w-[320px] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {specs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.04 }}
              className="rounded-[1.15rem] border border-[#0F3D37]/8 bg-white px-4 py-3.5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0F3D37]/45">
                {item.label}
              </p>
              <p className="mt-1 text-[15px] font-semibold text-[#0F3D37]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="mb-6 max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            How it works
          </p>
          <h2 className="mt-2 text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D37]">
            Three steps. Zero café friction.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-[1.6rem] p-7 md:p-8 ${
                i === 1
                  ? "bg-[#EE6F28] text-white"
                  : "border border-[#0F3D37]/8 bg-white text-[#0F3D37]"
              }`}
            >
              <p
                className={`text-[12px] font-semibold tracking-[0.18em] ${
                  i === 1 ? "text-white/80" : "text-[#EE6F28]"
                }`}
              >
                {step.n}
              </p>
              <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p
                className={`mt-2 text-[14px] leading-relaxed ${
                  i === 1 ? "text-white/85" : "text-[#0F3D37]/65"
                }`}
              >
                {step.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] bg-[#0F3D37] px-7 py-10 text-white md:px-12 md:py-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C]">
            Machine stack
          </p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Hygiene you can brief. Payments guests already know.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
            A public juicer only works when facilities, procurement, and guests
            all believe it. OranGo is engineered around that three-way handshake.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-[1.05rem] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/65">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Why guests come back
            </p>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0F3D37]">
              A cup that earns its place next to coffee and cola.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#0F3D37]/65">
              We are not fighting caffeine culture — we are giving high-footfall
              floors a healthier default that is just as convenient.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0F3D37] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#EE6F28]"
            >
              Place a machine
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[1.35rem] border border-[#0F3D37]/8 bg-white p-6"
              >
                <h3 className="text-[1.1rem] font-semibold text-[#0F3D37]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#0F3D37]/65">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#FFF5ED] p-8 md:p-10">
            <OrangeSliceDecor
              className="-right-6 -top-6 h-36 w-36 md:h-44 md:w-44"
              opacity={0.18}
              rotate={14}
            />
            <p className="relative text-[12px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
              Built for operators
            </p>
            <h2 className="relative mt-3 text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0F3D37]">
              Less café build-out. More predictable pours.
            </h2>
            <ul className="relative mt-6 space-y-3 text-[14px] leading-relaxed text-[#0F3D37]/75">
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
          <div className="relative flex min-h-[280px] items-end justify-center overflow-hidden rounded-[2rem] bg-[#0F3D37] px-6 pt-8">
            <Image
              src="/orange2.png"
              alt="Fresh sealed cup of orange juice"
              width={280}
              height={320}
              className="h-auto w-full max-w-[220px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-10 md:px-8">
        <div className="rounded-[2rem] border border-[#0F3D37]/8 bg-white px-7 py-10 md:px-12 md:py-12">
          <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold tracking-[-0.03em] text-[#0F3D37]">
            Questions operators actually ask
          </h2>
          <div className="mt-8">
            <FaqList />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-20 md:px-8 md:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-[#EE6F28] px-7 py-12 text-white md:px-12 md:py-14"
        >
          <OrangeSliceDecor
            className="-right-10 top-0 h-48 w-48 md:h-56 md:w-56"
            opacity={0.2}
            rotate={18}
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                Ready to put fresh juice on your floor?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                Tell us the site type, footfall, and city. We will map footprint,
                hygiene brief, and a realistic rollout path.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0F3D37] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0a2e2a]"
              >
                Talk to Orango
              </Link>
              <Link
                href="/business-opportunity"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
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
