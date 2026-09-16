"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import OrangeSliceDecor from "@/components/OrangeSliceDecor";

const models = [
  {
    kicker: "01",
    title: "Host a machine",
    copy: "You have the floor. We bring the juice infrastructure. Ideal for malls, hospitals, offices, and clubs that want a premium amenity without standing up a café.",
    points: [
      "No wet kitchen or barista hire",
      "Hygiene stack facilities can show",
      "Amenity that guests actually use",
    ],
    cta: "Propose a site",
  },
  {
    kicker: "02",
    title: "Operate a cluster",
    copy: "Franchise-style economics for partners who want to run a city pocket of machines — replenishment, local relationships, and a share of the pour.",
    points: [
      "Multi-site playbook and SLAs",
      "Shared telemetry and restocking",
      "Territory discussions for early cities",
    ],
    cta: "Explore operations",
  },
  {
    kicker: "03",
    title: "Strategic rollout",
    copy: "For funds, campus operators, and national F&B groups ready to discuss multi-city deployment, brand collaboration, or investment.",
    points: [
      "Multi-city deployment planning",
      "Supply and cold-chain alignment",
      "Direct line to the founding team",
    ],
    cta: "Start a partnership",
  },
];

const logic = [
  {
    title: "Low labour load",
    copy: "No barista roster. Cleaning cycles are scheduled. Your team is not running a juicer between other jobs.",
  },
  {
    title: "High-trust SKU",
    copy: "Guests see the fruit. Cups are sealed. UPI is native. The product explains itself in about 45 seconds.",
  },
  {
    title: "Amenity + yield",
    copy: "Hosts get a healthier F&B node. Operators get a repeatable pour. Both get a story procurement can defend.",
  },
  {
    title: "Built to network",
    copy: "One machine proves the floor. A cluster turns footfall into a managed juice operation across a campus or city.",
  },
];

const venues = [
  {
    title: "Malls & food courts",
    stat: "Dwell time",
    copy: "Convert browsers into spenders with a visible, hygienic juice ritual — without a kiosk crew.",
  },
  {
    title: "Corporate campuses",
    stat: "4:00 pm dip",
    copy: "Replace the soda run with a vitamin C service employees actually look forward to.",
  },
  {
    title: "Hospitals & clinics",
    stat: "Care adjacency",
    copy: "A sealed, ozone-sanitised cup is an easy yes for visitors and staff avoiding sugary defaults.",
  },
  {
    title: "Gyms & wellness",
    stat: "Post-set",
    copy: "Chilled juice in under a minute — hydration and a premium amenity memberships can taste.",
  },
  {
    title: "Airports & transit",
    stat: "Gate-ready",
    copy: "UPI, no queue theatre, no barista bottleneck. Fresh juice that matches departure pace.",
  },
  {
    title: "Hotels & campuses",
    stat: "24/7 amenity",
    copy: "A real F&B upgrade on floors where a café cannot economically live.",
  },
];

const proof = [
  { value: "45s", label: "Average serve" },
  { value: "0", label: "Added sugar" },
  { value: "4°C", label: "Fruit storage" },
  { value: "India", label: "Rollout focus" },
];

export default function BusinessOpportunityContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative overflow-hidden bg-[#F7FBFA]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-10 pt-[calc(var(--nav-h)+2.5rem)] md:px-8 md:pb-14">
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Business Opportunity
            </p>
            <h1 className="mt-3 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#0F3D37]">
              Turn high footfall into fresh orange juice revenue.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#0F3D37]/70">
              OranGo partners with location hosts, operators, and strategic
              groups to place automated fresh-juice machines where people already
              spend time — without café build-outs or wet kitchens.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
              >
                Start a conversation
              </Link>
              <Link
                href="/vending-machine"
                className="inline-flex items-center justify-center rounded-full border border-[#0F3D37]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#0F3D37] transition-colors hover:border-[#EE6F28]/40"
              >
                See the machine
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="grid grid-cols-2 gap-3"
          >
            {proof.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.35rem] bg-[#0F3D37] px-5 py-5 text-white"
              >
                <p className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#FFB45C]">
                  {item.value}
                </p>
                <p className="mt-1 text-[13px] text-white/70">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="mb-6 max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            Partnership models
          </p>
          <h2 className="mt-2 text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D37]">
            Three ways to build with Orango.
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {models.map((model, i) => (
            <motion.article
              key={model.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`flex flex-col rounded-[1.75rem] p-7 md:p-8 ${
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
                {model.kicker}
              </p>
              <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.02em]">
                {model.title}
              </h3>
              <p
                className={`mt-3 flex-1 text-[14px] leading-relaxed ${
                  i === 1 ? "text-white/85" : "text-[#0F3D37]/65"
                }`}
              >
                {model.copy}
              </p>
              <ul className="mt-5 space-y-2">
                {model.points.map((point) => (
                  <li
                    key={point}
                    className={`flex gap-2 text-[13px] ${
                      i === 1 ? "text-white/90" : "text-[#0F3D37]/75"
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        i === 1 ? "bg-white" : "bg-[#EE6F28]"
                      }`}
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-[13px] font-semibold transition-colors ${
                  i === 1
                    ? "bg-[#0F3D37] text-white hover:bg-[#0a2e2a]"
                    : "bg-[#0F3D37] text-white hover:bg-[#EE6F28]"
                }`}
              >
                {model.cta}
              </Link>
            </motion.article>
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
            Commercial logic
          </p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Why a wall can outperform a stall.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {logic.map((item, i) => (
              <div
                key={item.title}
                className="rounded-[1.35rem] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-[12px] font-semibold text-[#FFB45C]">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-[1.15rem] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="mb-6 max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            Ideal floors
          </p>
          <h2 className="mt-2 text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D37]">
            Where fresh juice already wants to live.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05 }}
              className="rounded-[1.4rem] border border-[#0F3D37]/8 bg-white p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EE6F28]">
                {item.stat}
              </p>
              <h3 className="mt-2 text-[1.15rem] font-semibold text-[#0F3D37]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#0F3D37]/65">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#FFF5ED] p-8">
            <Image
              src="/machine.png"
              alt="Orango juice machine for partner sites"
              width={420}
              height={520}
              className="mx-auto h-auto w-full max-w-[260px] object-contain"
            />
          </div>
          <div className="rounded-[2rem] border border-[#0F3D37]/8 bg-white p-8 md:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
              What we look for
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0F3D37]">
              Real floors. Real footfall. Partners ready to move.
            </h2>
            <ul className="mt-6 space-y-3 text-[14px] leading-relaxed text-[#0F3D37]/75">
              {[
                "High-visibility placement near circulation or dwell zones",
                "Power access and a small service clear for replenishment",
                "Openness to a healthier F&B amenity story",
                "Interest in one site first — or a multi-site cluster",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE6F28]" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] leading-relaxed text-[#0F3D37]/65">
              We are early-stage and India-focused — actively building the
              partnerships and operational network that will help us scale.
            </p>
          </div>
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
            className="-right-12 bottom-0 h-52 w-52 md:h-60 md:w-60"
            opacity={0.22}
            rotate={-18}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C]">
                Next step
              </p>
              <h2 className="mt-3 max-w-xl text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                If the floor is real, so is the discussion.
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75">
                Share site type, city, and approximate daily footfall. We will
                come back with placement fit, commercial options, and a clear
                next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
                >
                  Contact partnerships
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:border-white/50"
                >
                  Placement options
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[200px]">
              <Image
                src="/orange1.png"
                alt=""
                width={240}
                height={240}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
