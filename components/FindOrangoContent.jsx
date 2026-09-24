"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import { brand, findLocations } from "@/lib/site";

export default function FindOrangoContent() {
  const reduce = useReducedMotion();

  return (
    <article className="relative w-full max-w-full overflow-x-clip bg-[#FFFAF6]">
      <LiveBlobs />

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-10 pt-[calc(var(--nav-h)+1.5rem)] sm:px-5 sm:pb-12 sm:pt-[calc(var(--nav-h)+2rem)] md:px-8 md:pb-16 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            Find OranGo
          </p>
          <h1 className="mt-2.5 max-w-3xl text-[clamp(1.75rem,7vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410]">
            Live in Delhi NCR. Expanding across India.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8B3410]/70 sm:text-[16px]">
            Looking for a cup? Even a Delhi-only list beats silence. WhatsApp us
            for the nearest machine today — public map pins publish as each site
            goes live.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#D45A18]"
            >
              WhatsApp for nearest machine
            </a>
            <a
              href={brand.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-[#8B3410]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#8B3410]"
            >
              Call {brand.phone}
            </a>
          </div>
        </motion.div>

        <div className="mt-10 space-y-4">
          {findLocations.map((loc) => (
            <div
              key={loc.name}
              className="rounded-[1.5rem] border border-[#8B3410]/8 bg-white p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[20px] font-semibold text-[#8B3410]">
                  {loc.name}
                </h2>
                <span className="rounded-full bg-[#EE6F28]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#EE6F28]">
                  {loc.status}
                </span>
              </div>
              <p className="mt-1 text-[13px] font-medium text-[#8B3410]/55">
                {loc.area}
              </p>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#8B3410]/70">
                {loc.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-[#8B3410]/8 bg-white p-6 sm:p-8">
          <h2 className="text-[18px] font-semibold text-[#8B3410]">
            Consumer checklist
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              `From ${brand.priceFrom} per sealed cup`,
              `${brand.squeezeTime} from pay to pour`,
              "100% Valencia oranges — no sugar, no preservatives",
              "Pay with UPI",
              "Fruit stored at 4°C",
              "Ozone-cleaned fruit path",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-2 text-[14px] text-[#8B3410]/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE6F28]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-[#8B3410]/65">
            Want a machine at your venue instead?{" "}
            <Link
              href="/contact?intent=survey"
              className="font-semibold text-[#EE6F28]"
            >
              Book a site survey
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
