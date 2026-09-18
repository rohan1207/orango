"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import ContactForm from "@/components/ContactForm";
import { brand } from "@/lib/site";

const reasons = [
  {
    title: "Place a machine",
    copy: "Malls, hospitals, offices, gyms — tell us the floor and footfall.",
  },
  {
    title: "Operate a cluster",
    copy: "City-pocket economics, replenishment, and multi-site rollout.",
  },
  {
    title: "Strategic partnership",
    copy: "Multi-city deployment, brand collab, or investment conversations.",
  },
];

const channels = [
  {
    label: "Phone",
    value: brand.phone,
    href: brand.phoneHref,
    hint: "Fastest for site conversations",
  },
  {
    label: "General",
    value: brand.email,
    href: `mailto:${brand.email}`,
    hint: "Press, product, and general enquiries",
  },
  {
    label: "Partnerships",
    value: brand.partnershipsEmail,
    href: `mailto:${brand.partnershipsEmail}`,
    hint: "Hosts, operators, and strategic deals",
  },
];

export default function ContactContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative w-full max-w-full overflow-x-clip bg-[#FFFAF6]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-6 pt-[calc(var(--nav-h)+1.5rem)] sm:px-5 sm:pb-8 sm:pt-[calc(var(--nav-h)+2rem)] md:px-8 md:pb-10 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
              Contact Us
            </p>
            <h1 className="mt-2.5 max-w-xl text-[clamp(1.75rem,7.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410] sm:mt-3">
              Tell us about your floor. We will map the juice opportunity.
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#8B3410]/70 sm:mt-5 sm:text-[16px]">
              Share a site, a city, or a multi-location thesis. Partnerships and
              general enquiries both land with the Orango founding team in Delhi.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="grid gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-1"
          >
            {reasons.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.15rem] border border-[#8B3410]/8 bg-white px-4 py-3.5 sm:rounded-[1.25rem] sm:px-5 sm:py-4"
              >
                <p className="text-[13px] font-semibold text-[#8B3410] sm:text-[14px]">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#8B3410]/65 sm:text-[13px]">
                  {item.copy}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-12">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3 sm:gap-4 lg:col-span-5"
          >
            <div className="overflow-hidden rounded-[1.5rem] bg-[#EE6F28] p-5 text-white sm:rounded-[1.75rem] sm:p-7 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFB45C] sm:text-[12px]">
                Direct lines
              </p>
              <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
                {channels.map((channel) => (
                  <div key={channel.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-[11px]">
                      {channel.label}
                    </p>
                    <a
                      href={channel.href}
                      className="mt-1.5 block break-all text-[1.05rem] font-semibold tracking-[-0.02em] transition-colors hover:text-[#FFB45C] sm:break-normal sm:text-[1.15rem]"
                    >
                      {channel.value}
                    </a>
                    <p className="mt-1 text-[12px] text-white/55 sm:text-[13px]">
                      {channel.hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#8B3410]/8 bg-white p-5 sm:rounded-[1.75rem] sm:p-7 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28] sm:text-[12px]">
                HQ
              </p>
              <p className="mt-2.5 text-[1.05rem] font-semibold leading-snug text-[#8B3410] sm:mt-3 sm:text-[1.15rem]">
                {brand.address}
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-[#8B3410]/65 sm:mt-3 sm:text-[14px]">
                India rollout first. Early-stage partnerships welcome — location
                hosts, operators, and strategic groups.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                <Link
                  href="/vending-machine"
                  className="rounded-full bg-[#FFF5ED] px-3.5 py-1.5 text-[12px] font-semibold text-[#EE6F28]"
                >
                  Machine specs
                </Link>
                <Link
                  href="/business-opportunity"
                  className="rounded-full bg-[#FFF5ED] px-3.5 py-1.5 text-[12px] font-semibold text-[#EE6F28]"
                >
                  Partner models
                </Link>
              </div>
            </div>

            <div className="relative hidden min-h-[180px] overflow-hidden rounded-[1.75rem] bg-[#EE6F28] lg:block">
              <Image
                src="/orange3.png"
                alt=""
                fill
                className="object-contain object-right p-4 opacity-90"
                sizes="400px"
              />
            </div>
          </motion.aside>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="rounded-[1.5rem] border border-[#8B3410]/8 bg-white p-5 sm:rounded-[1.75rem] sm:p-6 md:p-9 lg:col-span-7"
          >
            <div className="mb-5 sm:mb-6">
              <h2 className="text-[clamp(1.3rem,5vw,1.85rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
                Send a brief
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8B3410]/65 sm:text-[14px]">
                The more we know about footfall, site type, and timeline, the
                faster we can reply with a useful next step.
              </p>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-14 pt-4 sm:px-5 sm:pb-20 sm:pt-6 md:px-8 md:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-2.5 sm:grid-cols-3 sm:gap-3"
        >
          {[
            {
              title: "Response focus",
              copy: "We prioritise site-ready floors and multi-location conversations.",
            },
            {
              title: "What to include",
              copy: "City, property type, approximate daily visitors, and your role.",
            },
            {
              title: "What happens next",
              copy: "Fit check, commercial options, and a clear path to placement.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.25rem] bg-[#EE6F28] px-5 py-5 text-white sm:rounded-[1.35rem] sm:px-6 sm:py-6"
            >
              <h3 className="text-[1rem] font-semibold sm:text-[1.05rem]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/70 sm:mt-2 sm:text-[13px]">
                {item.copy}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </article>
  );
}
