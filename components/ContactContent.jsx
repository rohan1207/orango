"use client";

import Link from "next/link";
import { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import SiteSurveyForm from "@/components/SiteSurveyForm";
import { brand, primaryCta } from "@/lib/site";

const channels = [
  {
    label: "Phone",
    value: brand.phone,
    href: brand.phoneHref,
    hint: "Fastest for site conversations",
  },
  {
    label: "WhatsApp",
    value: "Chat with OranGo",
    href: brand.whatsapp,
    hint: "Indian location deals happen here",
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
  {
    label: "Support",
    value: brand.supportEmail,
    href: `mailto:${brand.supportEmail}`,
    hint: "Failed vend · UTR + Machine ID",
  },
];

export default function ContactContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative w-full max-w-full overflow-x-clip bg-[#FFFAF6]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-6 pt-[calc(var(--nav-h)+1.5rem)] sm:px-5 sm:pb-8 sm:pt-[calc(var(--nav-h)+2rem)] md:px-8 md:pb-10 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28] sm:text-[12px]">
            Contact / Site survey
          </p>
          <h1 className="mt-2.5 max-w-xl text-[clamp(1.75rem,7.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410] sm:mt-3">
            Book a site survey for your mall, hospital, office or gym.
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#8B3410]/70 sm:mt-5 sm:text-[16px]">
            {brand.legalName} ({brand.name}). Tell us venue type, city, and role.
            We assess footprint, power, and loading access — then propose next
            steps.
          </p>
        </motion.div>
      </section>

      <section
        id="site-survey"
        className="relative z-10 mx-auto max-w-[1440px] px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-12"
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3 lg:col-span-4"
          >
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  channel.href.startsWith("http") ? "noreferrer" : undefined
                }
                className="block rounded-[1.25rem] border border-[#8B3410]/8 bg-white px-5 py-4 transition-colors hover:border-[#EE6F28]/35"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                  {channel.label}
                </p>
                <p className="mt-1 break-all text-[15px] font-semibold text-[#8B3410]">
                  {channel.value}
                </p>
                <p className="mt-1 text-[12px] text-[#8B3410]/55">
                  {channel.hint}
                </p>
              </a>
            ))}

            <div className="rounded-[1.25rem] border border-[#8B3410]/8 bg-white px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                Registered office
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#8B3410]/80">
                {brand.legalName}
                <br />
                {brand.addressFull}
              </p>
              <p className="mt-2 text-[12px] text-[#8B3410]/55">
                GSTIN: {brand.gstin} · FSSAI: {brand.fssai}
              </p>
              <a
                href="https://maps.google.com/?q=Hauz+Khas+Enclave+New+Delhi+110016"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-[13px] font-semibold text-[#EE6F28]"
              >
                Open in Maps →
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/the-machine"
                className="rounded-full border border-[#8B3410]/12 px-4 py-2 text-[12px] font-semibold text-[#8B3410]"
              >
                The Machine
              </Link>
              <Link
                href="/for-locations"
                className="rounded-full border border-[#8B3410]/12 px-4 py-2 text-[12px] font-semibold text-[#8B3410]"
              >
                For Locations
              </Link>
              <Link
                href="/support"
                className="rounded-full border border-[#8B3410]/12 px-4 py-2 text-[12px] font-semibold text-[#8B3410]"
              >
                Support
              </Link>
            </div>
          </motion.aside>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-[1.75rem] border border-[#8B3410]/8 bg-white p-5 sm:p-8 lg:col-span-8"
          >
            <h2 className="text-[20px] font-semibold text-[#8B3410]">
              {primaryCta.label}
            </h2>
            <p className="mt-2 text-[14px] text-[#8B3410]/65">
              Name, phone, organisation, city, venue type, and role — so we can
              qualify the lead before we visit.
            </p>
            <div className="mt-6">
              <Suspense
                fallback={
                  <p className="text-sm text-[#8B3410]/60">Loading form…</p>
                }
              >
                <SiteSurveyForm />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
