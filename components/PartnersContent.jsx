"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import {
  brand,
  partnerModels,
  partnerTimeline,
  primaryCta,
} from "@/lib/site";

export default function PartnersContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative w-full max-w-full overflow-x-clip bg-[#FFFAF6]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-8 pt-[calc(var(--nav-h)+1.5rem)] sm:px-5 sm:pb-10 sm:pt-[calc(var(--nav-h)+2rem)] md:px-8 md:pb-12 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            Partners
          </p>
          <h1 className="mt-2.5 max-w-3xl text-[clamp(1.75rem,7vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410]">
            Location, franchise, or strategic — in plain language.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8B3410]/70 sm:text-[16px]">
            OranGo is a location-based automated beverage network operated by{" "}
            {brand.legalName}. Choose the model that fits how you work with floor
            space and capital.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-10 sm:px-5 md:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {partnerModels.map((model) => (
            <div
              key={model.title}
              className="flex flex-col rounded-[1.5rem] border border-[#8B3410]/8 bg-white p-6 sm:p-7"
            >
              <h2 className="text-[20px] font-semibold text-[#8B3410]">
                {model.title}
              </h2>
              <dl className="mt-5 space-y-4 text-[14px]">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                    Best for
                  </dt>
                  <dd className="mt-1 text-[#8B3410]/75">{model.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                    You provide
                  </dt>
                  <dd className="mt-1 text-[#8B3410]/75">{model.youProvide}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                    We provide
                  </dt>
                  <dd className="mt-1 text-[#8B3410]/75">{model.weProvide}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                    Next step
                  </dt>
                  <dd className="mt-1 text-[#8B3410]/75">{model.nextStep}</dd>
                </div>
              </dl>
              <Link
                href={primaryCta.href}
                className="mt-auto pt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#EE6F28]"
              >
                Start here →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <h2 className="text-[clamp(1.4rem,3.5vw,2.1rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
          From enquiry to go-live
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {partnerTimeline.map((item) => (
            <div
              key={item.step}
              className="rounded-[1.35rem] border border-[#8B3410]/8 bg-white p-5"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EE6F28]">
                {item.step}
              </p>
              <h3 className="mt-2 text-[16px] font-semibold text-[#8B3410]">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8B3410]/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-16 sm:px-5 md:px-8">
        <div className="rounded-[2rem] bg-[#8B3410] px-6 py-10 text-center text-white sm:px-10 md:py-14">
          <h2 className="text-[clamp(1.5rem,4vw,2.4rem)] font-semibold tracking-[-0.03em]">
            Ready to talk commercial terms?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-white/75">
            If unit economics are confidential, we still describe the model
            clearly: you host; we operate; visitors get a healthier option.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex rounded-full bg-[#EE6F28] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-[#D45A18]"
            >
              Qualified partner form
            </Link>
            <a
              href={`mailto:${brand.partnershipsEmail}`}
              className="inline-flex rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-white/10"
            >
              {brand.partnershipsEmail}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
