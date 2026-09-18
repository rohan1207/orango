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
    <article className="relative w-full max-w-full overflow-x-clip bg-[#FFFAF6]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-8 pt-[calc(var(--nav-h)+1.5rem)] sm:px-5 sm:pb-10 sm:pt-[calc(var(--nav-h)+2rem)] md:px-8 md:pb-14 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="grid items-end gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
              Business Opportunity
            </p>
            <h1 className="mt-2.5 max-w-2xl text-[clamp(1.75rem,7.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410] sm:mt-3">
              Turn high footfall into fresh orange juice revenue.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#8B3410]/70 sm:mt-5 sm:text-[16px]">
              OranGo partners with location hosts, operators, and strategic
              groups to place automated fresh-juice machines where people already
              spend time — without café build-outs or wet kitchens.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
              >
                Start a conversation
              </Link>
              <Link
                href="/vending-machine"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#8B3410]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#8B3410] transition-colors hover:border-[#EE6F28]/40 sm:w-auto"
              >
                See the machine
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="grid grid-cols-2 gap-2.5 sm:gap-3"
          >
            {proof.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.2rem] bg-[#EE6F28] px-4 py-4 text-white sm:rounded-[1.35rem] sm:px-5 sm:py-5"
              >
                <p className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[#FFB45C] sm:text-[1.75rem]">
                  {item.value}
                </p>
                <p className="mt-1 text-[12px] text-white/70 sm:text-[13px]">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="mb-5 max-w-2xl sm:mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
            Partnership models
          </p>
          <h2 className="mt-2 text-[clamp(1.5rem,6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#8B3410]">
            Three ways to build with Orango.
          </h2>
        </div>
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {models.map((model, i) => (
            <motion.article
              key={model.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`flex flex-col rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-7 md:p-8 ${
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
                {model.kicker}
              </p>
              <h3 className="mt-2.5 text-[1.25rem] font-semibold tracking-[-0.02em] sm:mt-3 sm:text-[1.45rem]">
                {model.title}
              </h3>
              <p
                className={`mt-2.5 flex-1 text-[13px] leading-relaxed sm:mt-3 sm:text-[14px] ${
                  i === 1 ? "text-white/85" : "text-[#8B3410]/65"
                }`}
              >
                {model.copy}
              </p>
              <ul className="mt-4 space-y-2 sm:mt-5">
                {model.points.map((point) => (
                  <li
                    key={point}
                    className={`flex gap-2 text-[12px] sm:text-[13px] ${
                      i === 1 ? "text-white/90" : "text-[#8B3410]/75"
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
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[13px] font-semibold transition-colors sm:mt-8 ${
                  i === 1
                    ? "bg-white text-[#8B3410] hover:bg-[#FFF5ED]"
                    : "bg-[#EE6F28] text-white hover:bg-[#D45A18]"
                }`}
              >
                {model.cta}
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[1.6rem] bg-[#EE6F28] px-5 py-8 text-white sm:rounded-[2rem] sm:px-7 sm:py-10 md:px-12 md:py-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C] sm:text-[12px]">
            Commercial logic
          </p>
          <h2 className="mt-2.5 max-w-3xl text-[clamp(1.4rem,5.5vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] sm:mt-3">
            Why a wall can outperform a stall.
          </h2>
          <div className="mt-7 grid gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-4">
            {logic.map((item, i) => (
              <div
                key={item.title}
                className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4 sm:rounded-[1.35rem] sm:p-6"
              >
                <p className="text-[11px] font-semibold text-[#FFB45C] sm:text-[12px]">
                  0{i + 1}
                </p>
                <h3 className="mt-1.5 text-[1.05rem] font-semibold sm:mt-2 sm:text-[1.15rem]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/65 sm:mt-2 sm:text-[14px]">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="mb-5 max-w-2xl sm:mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
            Ideal floors
          </p>
          <h2 className="mt-2 text-[clamp(1.5rem,6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#8B3410]">
            Where fresh juice already wants to live.
          </h2>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {venues.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05 }}
              className="rounded-[1.25rem] border border-[#8B3410]/8 bg-white p-5 sm:rounded-[1.4rem] sm:p-6"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EE6F28] sm:text-[11px]">
                {item.stat}
              </p>
              <h3 className="mt-1.5 text-[1.05rem] font-semibold text-[#8B3410] sm:mt-2 sm:text-[1.15rem]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#8B3410]/65 sm:mt-2 sm:text-[14px]">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-4 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#FFF5ED] p-6 sm:rounded-[2rem] sm:p-8">
            <Image
              src="/machine.png"
              alt="Orango juice machine for partner sites"
              width={420}
              height={520}
              className="mx-auto h-auto w-full max-w-[200px] object-contain sm:max-w-[260px]"
            />
          </div>
          <div className="rounded-[1.5rem] border border-[#8B3410]/8 bg-white p-6 sm:rounded-[2rem] sm:p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28] sm:text-[12px]">
              What we look for
            </p>
            <h2 className="mt-2.5 text-[clamp(1.35rem,5vw,2.2rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-[#8B3410] sm:mt-3">
              Real floors. Real footfall. Partners ready to move.
            </h2>
            <ul className="mt-5 space-y-2.5 text-[13px] leading-relaxed text-[#8B3410]/75 sm:mt-6 sm:space-y-3 sm:text-[14px]">
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
            <p className="mt-5 text-[13px] leading-relaxed text-[#8B3410]/65 sm:mt-6 sm:text-[14px]">
              We are early-stage and India-focused — actively building the
              partnerships and operational network that will help us scale.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-14 sm:px-5 sm:pb-20 md:px-8 md:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[1.6rem] bg-[#EE6F28] px-5 py-10 text-white sm:rounded-[2rem] sm:px-7 sm:py-12 md:px-12 md:py-14"
        >
          <OrangeSliceDecor
            className="-right-12 bottom-0 hidden h-52 w-52 sm:block md:h-60 md:w-60"
            opacity={0.22}
            rotate={-18}
          />
          <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C] sm:text-[12px]">
                Next step
              </p>
              <h2 className="mt-2.5 max-w-xl text-[clamp(1.4rem,5.5vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] sm:mt-3">
                If the floor is real, so is the discussion.
              </h2>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/75 sm:mt-4 sm:text-[15px]">
                Share site type, city, and approximate daily footfall. We will
                come back with placement fit, commercial options, and a clear
                next step.
              </p>
              <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#8B3410] transition-colors hover:bg-[#FFF5ED] sm:w-auto"
                >
                  Contact partnerships
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/45 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:border-white/70 sm:w-auto"
                >
                  Placement options
                </Link>
              </div>
            </div>
            <div className="relative mx-auto hidden w-full max-w-[160px] sm:block sm:max-w-[200px]">
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
