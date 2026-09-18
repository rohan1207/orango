"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import OrangeSliceDecor from "@/components/OrangeSliceDecor";

const spaces = [
  {
    title: "Hospitals",
    copy: "A clean choice for visitors and staff.",
    image: "/hospital.png",
  },
  {
    title: "Offices",
    copy: "The 4pm ritual, upgraded.",
    image: "/office.png",
  },
  {
    title: "Malls",
    copy: "Footfall converted into fresh pours.",
    image: "/mall.png",
  },
  {
    title: "Gyms",
    copy: "Post-workout hydration, chilled.",
    image: "/gym.png",
  },
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
              About Us
            </p>
            <h1 className="mt-2.5 max-w-xl text-[clamp(1.75rem,7.5vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410] sm:mt-3">
              Bringing Fresh Orange Juice Closer to Everyday Life
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#8B3410]/70 sm:mt-5 sm:text-[16px]">
              Fresh orange juice has always existed — convenient access to it has
              not. OranGo makes the healthier pour as effortless as the drinks
              that already own India&apos;s public spaces.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
              >
                Contact us
              </Link>
              <Link
                href="/business-opportunity"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#8B3410]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#8B3410] transition-colors hover:border-[#EE6F28]/40 sm:w-auto"
              >
                Partner with us
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
              className="-left-8 -top-6 hidden h-56 w-56 sm:block md:h-72 md:w-72"
              opacity={0.2}
              rotate={-10}
            />
            <div className="relative grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] border border-[#EE6F28]/12 bg-[#FFF5ED] sm:rounded-[1.5rem]">
                <Image
                  src="/machine.png"
                  alt="Orango automated juice vending machine"
                  fill
                  className="object-contain object-bottom p-2 sm:p-3"
                  sizes="(max-width: 640px) 45vw, 240px"
                  priority
                />
              </div>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className="relative min-h-[120px] flex-1 overflow-hidden rounded-[1.25rem] bg-[#FFF5ED] sm:rounded-[1.5rem]">
                  <Image
                    src="/jar.png"
                    alt="Glass of fresh orange juice"
                    fill
                    className="object-contain object-bottom p-1.5 sm:p-2"
                    sizes="(max-width: 640px) 45vw, 200px"
                    priority
                  />
                </div>
                <div className="relative h-24 overflow-hidden rounded-[1.25rem] bg-[#EE6F28] sm:h-28 sm:rounded-[1.5rem]">
                  <Image
                    src="/orange1.png"
                    alt=""
                    fill
                    className="object-contain p-1.5 sm:p-2"
                    sizes="(max-width: 640px) 45vw, 200px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
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
              className="flex items-center gap-3 rounded-[1.15rem] border border-[#8B3410]/8 bg-white px-4 py-3.5 sm:block sm:rounded-[1.25rem] sm:px-5 sm:py-4"
            >
              <p className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#EE6F28] sm:text-[1.5rem]">
                {item.value}
              </p>
              <p className="text-[13px] text-[#8B3410]/65">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Observation + stance */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.5rem] bg-[#EE6F28] p-6 text-white sm:rounded-[1.75rem] sm:p-8 md:p-10 lg:col-span-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C] sm:text-[12px]">
              Our simple observation
            </p>
            <h2 className="mt-3 text-[clamp(1.4rem,5.5vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] sm:mt-4">
              Modern public spaces are dominated by caffeine, fizz, and sugar.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/75 sm:mt-5 sm:text-[15px]">
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
            className="rounded-[1.5rem] bg-white p-6 sm:rounded-[1.75rem] sm:p-8 md:p-10 lg:col-span-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28] sm:text-[12px]">
              Our stance
            </p>
            <p className="mt-3 text-[clamp(1.15rem,4.5vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em] text-[#8B3410] sm:mt-4">
              We don&apos;t want to replace those drinks — we want fresh orange
              juice to be as effortless, so consumers have a healthier choice in
              places they already spend time.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
              {["No café build-out", "No wet kitchen", "No added sugar"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#FFF5ED] px-3 py-1.5 text-[11px] font-semibold text-[#EE6F28] sm:px-3.5 sm:text-[12px]"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we are building — bento */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="mb-5 max-w-2xl md:mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
            What we are building
          </p>
          <h2 className="mt-2 text-[clamp(1.5rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#8B3410]">
            Bringing fresh orange juice to everyday public spaces
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:grid-rows-[minmax(180px,1fr)_minmax(180px,1fr)] md:gap-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative col-span-2 min-h-[200px] overflow-hidden rounded-[1.25rem] bg-[#EE6F28] sm:min-h-[240px] sm:rounded-[1.5rem] md:row-span-2 md:min-h-0 md:rounded-[1.75rem]"
          >
            <Image
              src="/machine.png"
              alt="Orango automated juice vending machine"
              fill
              className="object-contain object-bottom p-3 sm:p-4 md:p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#8B3410]/55 to-transparent px-4 pb-4 pt-12 sm:px-5 sm:pb-5 sm:pt-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFE0B8] sm:text-[13px]">
                OranGo machine
              </p>
              <p className="mt-0.5 text-[1rem] font-semibold text-white sm:mt-1 sm:text-[1.05rem] md:text-[1.15rem]">
                Fresh juice, on the spot
              </p>
            </div>
          </motion.div>

          {spaces.map((space, i) => (
            <motion.div
              key={space.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.04 }}
              className="relative min-h-[140px] overflow-hidden rounded-[1.15rem] bg-[#FFF5ED] sm:min-h-[150px] sm:rounded-[1.35rem] md:min-h-0 md:rounded-[1.5rem]"
            >
              <Image
                src={space.image}
                alt={space.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B3410]/75 via-[#8B3410]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5">
                <h3 className="text-[0.95rem] font-semibold text-white sm:text-[1rem] md:text-[1.1rem]">
                  {space.title}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/80 sm:text-[12px] md:text-[13px]">
                  {space.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-3xl border-l-2 border-[#EE6F28] pl-4 sm:mt-10 sm:pl-5 md:mt-12 md:pl-7"
        >
          <p className="text-[15px] leading-relaxed text-[#8B3410]/75 sm:text-[16px] md:text-[18px]">
            OranGo is building a network of automated machines that offer fresh
            orange juice on the spot in high-footfall public spaces —
            hospitals, offices, malls, and gyms.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#8B3410]/75 sm:mt-4 sm:text-[16px] md:text-[18px]">
            Our goal is to make fresh orange juice a convenient part of everyday
            routines: a work break, a hospital wait, a workout cool-down, or a
            shopping loop.
          </p>
        </motion.blockquote>
      </section>

      {/* Pillars */}
      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="grid gap-3 md:grid-cols-3">
          {pillars.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-[1.35rem] p-5 sm:rounded-[1.5rem] sm:p-6 md:p-7 ${
                i === 1
                  ? "bg-[#EE6F28] text-white"
                  : "border border-[#8B3410]/8 bg-white text-[#8B3410]"
              }`}
            >
              <p
                className={`text-[11px] font-semibold tracking-[0.16em] sm:text-[12px] ${
                  i === 1 ? "text-[#FFB45C]" : "text-[#EE6F28]"
                }`}
              >
                {item.kicker}
              </p>
              <h3 className="mt-2.5 text-[1.15rem] font-semibold tracking-[-0.02em] sm:mt-3 sm:text-[1.25rem]">
                {item.title}
              </h3>
              <p
                className={`mt-2 text-[13px] leading-relaxed sm:text-[14px] ${
                  i === 1 ? "text-white/75" : "text-[#8B3410]/65"
                }`}
              >
                {item.copy}
              </p>
            </motion.article>
          ))}
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
            className="-right-12 top-0 hidden h-52 w-52 sm:block md:h-60 md:w-60"
            opacity={0.22}
            rotate={20}
          />
          <div className="relative grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C] sm:text-[12px]">
                Early stage · India focus
              </p>
              <h2 className="mt-2.5 max-w-xl text-[clamp(1.4rem,5.5vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] sm:mt-3">
                We are building the partnerships and operational network to scale
                across India.
              </h2>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/75 sm:mt-4 sm:text-[15px]">
                If you host high-footfall space — or want to operate a cluster of
                machines — we&apos;d love to talk placement, yield, and rollout.
              </p>
              <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#8B3410] transition-colors hover:bg-[#FFF5ED] sm:w-auto"
                >
                  Contact us for more information
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/45 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:border-white/70 sm:w-auto"
                >
                  Place a machine
                </Link>
              </div>
            </div>
            <div className="relative mx-auto hidden w-full max-w-[180px] sm:block sm:max-w-[220px]">
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
