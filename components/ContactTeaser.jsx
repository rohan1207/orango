"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/lib/site";
import LiveBlobs from "./LiveBlobs";
import OrangeSliceDecor from "./OrangeSliceDecor";

export default function ContactTeaser() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="next-step-heading"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <LiveBlobs />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-5 lg:grid-cols-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-[#0F3D37] p-8 text-white md:p-11 lg:col-span-7"
          >
            <OrangeSliceDecor
              className="-right-10 top-6 h-40 w-40 md:h-48 md:w-48"
              opacity={0.22}
              rotate={18}
            />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FFB45C]">
              Next step
            </p>
            <h2
              id="next-step-heading"
              className="relative mt-4 max-w-xl text-[clamp(1.9rem,3.5vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              Tell us the floor. We&apos;ll talk juice, yield, and placement.
            </h2>
            <p className="relative mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
              Delhi HQ. India rollout. If you control space, operations, or
              capital â€” start with a short brief: site type, footfall, and what a
              win looks like.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
              >
                Get in touch
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:border-white/50"
              >
                Browse machines
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <motion.a
              href={brand.phoneHref}
              whileHover={reduce ? undefined : { y: -4 }}
              className="relative overflow-hidden rounded-[1.6rem] bg-[#EE6F28] p-7 text-white"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FFE0B8]">
                Call
              </p>
              <p className="mt-3 text-[1.4rem] font-semibold tracking-[-0.02em]">
                {brand.phone}
              </p>
              <p className="mt-1 text-[13px] text-white/75">
                Talk placement & partnerships
              </p>
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-2 w-20 opacity-90"
              >
                <Image src="/orange3.png" alt="" width={120} height={120} />
              </motion.div>
            </motion.a>

            <motion.a
              href={`mailto:${brand.partnershipsEmail}`}
              whileHover={reduce ? undefined : { y: -4 }}
              className="rounded-[1.6rem] bg-[#FFF5ED] p-7"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                Email
              </p>
              <p className="mt-3 break-all text-[1.05rem] font-semibold tracking-[-0.02em] text-[#0F3D37]">
                {brand.partnershipsEmail}
              </p>
              <p className="mt-1 text-[13px] text-[#0F3D37]/55">
                Send your site brief today
              </p>
            </motion.a>

            <motion.div
              whileHover={reduce ? undefined : { y: -4 }}
              className="rounded-[1.6rem] border border-[#0F3D37]/8 bg-white p-7 sm:col-span-2 lg:col-span-1"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#EE6F28]">
                Studio
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#0F3D37]/75">
                {brand.address}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
