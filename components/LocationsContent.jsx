"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import { primaryCta, venueTypes } from "@/lib/site";

export default function LocationsContent() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(venueTypes[0].id);
  const current = venueTypes.find((v) => v.id === active) || venueTypes[0];

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
            For Locations
          </p>
          <h1 className="mt-2.5 max-w-3xl text-[clamp(1.75rem,7vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410]">
            Place OranGo where people already spend time.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8B3410]/70 sm:text-[16px]">
            Hospitals, offices, malls, gyms, campuses, and transit hubs. You
            provide the bay and power. We install, restock, and clean. Visitors
            get fresh Valencia orange juice in about 45 seconds.
          </p>
          <Link
            href={primaryCta.href}
            className="mt-6 inline-flex rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#D45A18]"
          >
            Request a site survey
          </Link>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-2">
          {venueTypes.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(v.id)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                active === v.id
                  ? "bg-[#EE6F28] text-white"
                  : "border border-[#8B3410]/12 bg-white text-[#8B3410]/70 hover:border-[#EE6F28]/40"
              }`}
            >
              {v.title}
            </button>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-[#8B3410]/8 bg-white lg:grid-cols-2">
          <div className="relative min-h-[240px] sm:min-h-[320px]">
            <Image
              src={current.image}
              alt={`${current.title} — OranGo location fit`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
              {current.title}
            </h2>
            <p className="mt-3 text-[15px] font-medium text-[#EE6F28]">
              {current.problem}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#8B3410]/70">
              {current.fit}
            </p>
            <ul className="mt-5 space-y-2.5">
              {current.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-2 text-[14px] leading-relaxed text-[#8B3410]/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE6F28]" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?intent=survey&venue=${encodeURIComponent(current.title.replace(/s$/, "") || current.title)}`}
              className="mt-7 inline-flex w-fit rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#D45A18]"
            >
              Request a site survey
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[#8B3410]/10 bg-[#F3F1EE] p-6 sm:p-8">
          <h3 className="text-[18px] font-semibold text-[#8B3410]">
            What we need from you
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              "Roughly 12 sq. ft. of floor space",
              "A standard power point",
              "Loading / restock access for OranGo ops",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl bg-white px-4 py-3 text-[14px] text-[#8B3410]/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {venueTypes.map((v) => (
            <Link
              key={v.id}
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                setActive(v.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-[1.35rem] border border-[#8B3410]/8 bg-white p-5 transition-colors hover:border-[#EE6F28]/35"
            >
              <h3 className="text-[16px] font-semibold text-[#8B3410]">
                {v.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8B3410]/65">
                {v.fit}
              </p>
              <span className="mt-3 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#EE6F28]">
                Learn more
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
