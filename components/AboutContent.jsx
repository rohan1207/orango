"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import OrangeSliceDecor from "@/components/OrangeSliceDecor";

const spaces = [
  { title: "Hospitals", copy: "A clean choice for visitors and staff." },
  { title: "Offices", copy: "The 4pm ritual, upgraded." },
  { title: "Malls", copy: "Footfall converted into fresh pours." },
  { title: "Gyms", copy: "Post-workout hydration, chilled." },
];

const pillars = [
  {
    kicker: "01",
    title: "Pure by default",
    copy: "100% Valencia orange juice. No added sugar, no preservatives, no dilution.",
  },
  {
    kicker: "02",
    title: "Convenient by design",
    copy: "UPI pay, squeeze to order, sealed cup — usually in under a minute.",
  },
  {
    kicker: "03",
    title: "Built to scale",
    copy: "A machine network for India — hygiene, cold-chain, and replenishment included.",
  },
];

export default function AboutContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative overflow-hidden bg-[#F7FBFA]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-10 pt-[calc(var(--nav-h)+2.5rem)] md:px-8 md:pb-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              About Us
            </p>
            <h1 className="mt-3 max-w-xl text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#0F3D37]">
              Bringing Fresh Orange Juice Closer to Everyday Life
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#0F3D37]/70">
              Fresh orange juice has always existed — convenient access to it has
              not. OranGo makes the healthier pour as effortless as the drinks
              that already own India&apos;s public spaces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
              >
                Contact us
              </Link>
              <Link
                href="/business-opportunity"
                className="inline-flex items-center justify-center rounded-full border border-[#0F3D37]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#0F3D37] transition-colors hover:border-[#EE6F28]/40"
              >
                Partner with us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <OrangeSliceDecor
              className="-left-8 -top-6 h-56 w-56 md:h-72 md:w-72"
              opacity={0.2}
              rotate={-10}
            />
            <div className="relative grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-[#0F3D37]">
                <Image
                  src="/orange-half.png"
                  alt="Fresh Valencia orange half"
                  fill
                  className="object-cover"
                  sizes="240px"
                  priority
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative flex-1 overflow-hidden rounded-[1.5rem] bg-[#FFF5ED]">
                  <Image
                    src="/orange2.png"
                    alt="Glass of fresh orange juice"
                    fill
                    className="object-contain object-bottom p-2"
                    sizes="200px"
                    priority
                  />
                </div>
                <div className="relative h-28 overflow-hidden rounded-[1.5rem] bg-[#EE6F28]">
                  <Image
                    src="/orange1.png"
                    alt=""
                    fill
                    className="object-contain p-2"
                    sizes="200px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { value: "100%", label: "Pure juice · no additives" },
            { value: "45s", label: "Squeezed to order" },
            { value: "India", label: "Built for high footfall" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="rounded-[1.25rem] border border-[#0F3D37]/8 bg-white px-5 py-4"
            >
              <p className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[#EE6F28]">
                {item.value}
              </p>
              <p className="mt-1 text-[13px] text-[#0F3D37]/65">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-4 lg:grid-cols-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.75rem] bg-[#0F3D37] p-8 text-white md:p-10 lg:col-span-5"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C]">
              Our simple observation
            </p>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              Modern public spaces are dominated by caffeine, fizz, and sugar.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/75">
              Truly pure, hygienic, high-quality orange juice is rarely easy to
              find — not because people don&apos;t want it, but because serving
              it used to mean a counter, a crew, and a wet kitchen.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="rounded-[1.75rem] bg-white p-8 md:p-10 lg:col-span-7"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
              Our stance
            </p>
            <p className="mt-4 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em] text-[#0F3D37]">
              We don&apos;t want to replace those drinks — we want fresh orange
              juice to be as effortless, so consumers have a healthier choice in
              places they already spend time.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["No café build-out", "No wet kitchen", "No added sugar"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#FFF5ED] px-3.5 py-1.5 text-[12px] font-semibold text-[#EE6F28]"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="mb-6 max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            What we are building
          </p>
          <h2 className="mt-2 text-[clamp(1.7rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D37]">
            Bringing fresh orange juice to everyday public spaces
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[1.75rem] bg-[#EE6F28] p-8 text-white md:p-10 lg:col-span-7"
          >
            <OrangeSliceDecor
              className="-right-8 -top-6 h-40 w-40 md:h-48 md:w-48"
              opacity={0.2}
              rotate={16}
            />
            <p className="relative text-[15px] leading-relaxed text-white/90 md:text-[16px]">
              OranGo is building a network of automated machines that offer fresh
              orange juice on the spot in high-footfall public spaces —
              hospitals, offices, malls, and gyms.
            </p>
            <p className="relative mt-4 text-[15px] leading-relaxed text-white/85 md:text-[16px]">
              Our goal is to make fresh orange juice a convenient part of
              everyday routines: a work break, a hospital wait, a workout
              cool-down, or a shopping loop.
            </p>
            <div className="relative mt-8 max-w-xs">
              <Image
                src="/machine.png"
                alt="Orango automated juice vending machine"
                width={420}
                height={520}
                className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              />
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {spaces.map((space, i) => (
              <motion.div
                key={space.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[1.35rem] border border-[#0F3D37]/8 bg-white p-5"
              >
                <h3 className="text-[1.1rem] font-semibold text-[#0F3D37]">
                  {space.title}
                </h3>
                <p className="mt-1 text-[13px] text-[#0F3D37]/65">{space.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-3 md:grid-cols-3">
          {pillars.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-[1.5rem] p-6 md:p-7 ${
                i === 1
                  ? "bg-[#0F3D37] text-white"
                  : "border border-[#0F3D37]/8 bg-white text-[#0F3D37]"
              }`}
            >
              <p
                className={`text-[12px] font-semibold tracking-[0.16em] ${
                  i === 1 ? "text-[#FFB45C]" : "text-[#EE6F28]"
                }`}
              >
                {item.kicker}
              </p>
              <h3 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p
                className={`mt-2 text-[14px] leading-relaxed ${
                  i === 1 ? "text-white/75" : "text-[#0F3D37]/65"
                }`}
              >
                {item.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-20 md:px-8 md:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-[#0F3D37] px-7 py-12 text-white md:px-12 md:py-14"
        >
          <OrangeSliceDecor
            className="-right-12 top-0 h-52 w-52 md:h-60 md:w-60"
            opacity={0.22}
            rotate={20}
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C]">
                Early stage · India focus
              </p>
              <h2 className="mt-3 max-w-xl text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                We are building the partnerships and operational network to scale
                across India.
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75">
                If you host high-footfall space — or want to operate a cluster of
                machines — we&apos;d love to talk placement, yield, and rollout.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
                >
                  Contact us for more information
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:border-white/50"
                >
                  Place a machine
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[220px]">
              <Image
                src="/orange3.png"
                alt=""
                width={260}
                height={260}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
