"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import OrangeSliceDecor from "./OrangeSliceDecor";

export default function HealthBenefits() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="benefits-heading"
      className="relative overflow-hidden bg-white py-12 md:py-16"
    >
      <OrangeSliceDecor
        className="-right-8 top-6 h-40 w-40 md:h-48 md:w-48"
        opacity={0.18}
        rotate={14}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
              OranGo Benefits
            </p>
            <h2
              id="benefits-heading"
              className="mt-1.5 text-[clamp(1.55rem,2.8vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#8B3410]"
            >
              Health Benefits
            </h2>
            <p className="mt-1 text-[14px] text-[#8B3410]/6">
              Every cup brings natural wellness.
            </p>
          </div>
          <Link
            href="/vending-machine"
            className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
          >
            Explore the machine
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-[148px_148px]">
          {/* Vitamin C - featured photo */}
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative col-span-2 overflow-hidden rounded-[1.35rem] md:col-span-5 md:row-span-2"
          >
            <Image
              src="/orange-half.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#EE6F28]/92 via-[#EE6F28]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFB45C]">
                Hero nutrient
              </p>
              <h3 className="mt-1 text-[1.35rem] font-semibold text-white">
                Vitamin C
              </h3>
              <p className="mt-1 max-w-[16rem] text-[12px] leading-snug text-white/75">
                Fresh Valencia oranges - a bright daily dose.
              </p>
            </div>
          </motion.article>

          {/* Immunity */}
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04 }}
            className="relative overflow-hidden rounded-[1.35rem] bg-[#EE6F28] p-4 text-white md:col-span-3"
          >
            <Image
              src="/orange-bg.png"
              alt=""
              width={64}
              height={64}
              className="absolute -right-1 -top-1 h-14 w-14 rotate-[18deg] object-contain"
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFE0B8]">
              Daily
            </p>
            <h3 className="mt-6 text-[1.1rem] font-semibold">Immunity</h3>
            <p className="mt-1 text-[12px] leading-snug text-white/80">
              Pure juice. No syrup. No shortcuts.
            </p>
          </motion.article>

          {/* Energy - juice glass */}
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="relative overflow-hidden rounded-[1.35rem] bg-[#FFF5ED] md:col-span-4 md:row-span-2"
          >
            <div className="relative z-[1] p-4 pb-0">
              <h3 className="text-[1.1rem] font-semibold text-[#8B3410]">
                Energy Boost
              </h3>
              <p className="mt-1 text-[12px] leading-snug text-[#8B3410]/65">
                Clean fuel for the 4pm dip.
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 top-14">
              <Image
                src="/jar.png"
                alt=""
                fill
                className="object-contain object-bottom p-1"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            </div>
          </motion.article>

          {/* Heart */}
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[1.35rem] border border-[#8B3410]/8 bg-white p-4 md:col-span-3"
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EE6F28]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFB45C]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFD4A8]" />
            </div>
            <div>
              <h3 className="text-[1.1rem] font-semibold text-[#8B3410]">
                Heart Health
              </h3>
              <p className="mt-1 text-[12px] leading-snug text-[#8B3410]/65">
                Natural nutrients. Zero dilution.
              </p>
            </div>
          </motion.article>
        </div>

        {/* Bottom duo */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex min-h-[120px] items-center gap-4 overflow-hidden rounded-[1.35rem] bg-[#EE6F28] p-4 text-white md:min-h-[132px] md:p-5"
          >
            <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-24">
              <Image
                src="/orange3.png"
                alt=""
                fill
                className="object-contain"
                sizes="96px"
              />
            </div>
            <div>
              <h3 className="text-[1.15rem] font-semibold">Hydration</h3>
              <p className="mt-1 text-[13px] leading-snug text-white/70">
                Chilled & sealed in under a minute.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="relative flex min-h-[120px] items-center gap-4 overflow-hidden rounded-[1.35rem] bg-[#EE6F28] p-4 text-white md:min-h-[132px] md:p-5"
          >
            <div className="min-w-0 flex-1">
              <h3 className="text-[1.15rem] font-semibold">Skin Wellness</h3>
              <p className="mt-1 text-[13px] leading-snug text-white/80">
                Citrus antioxidants - not concentrate.
              </p>
            </div>
            <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-28">
              <Image
                src="/orange1.png"
                alt=""
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
