"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "./LiveBlobs";
import OrangeSliceDecor from "./OrangeSliceDecor";

const models = [
  {
    kicker: "01",
    title: "Host a machine",
    copy: "You have the floor. We bring juice infrastructure for malls, hospitals, offices, and clubs.",
  },
  {
    kicker: "02",
    title: "Operate a cluster",
    copy: "Run a city pocket of machines with replenishment support and shared economics.",
  },
  {
    kicker: "03",
    title: "Partner at scale",
    copy: "Multi-site rollouts for operators who want branded F&B without building cafÃ©s.",
  },
];

export default function CtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="operators-heading"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <LiveBlobs />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#EE6F28] px-6 py-12 text-white md:px-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #FF9A4A 0%, #F07A32 50%, #EE6F28 100%)",
            }}
          />
          <OrangeSliceDecor
            className="-left-14 top-6 h-52 w-52 md:h-60 md:w-60"
            opacity={0.2}
            rotate={-15}
          />
          <OrangeSliceDecor
            className="-right-16 bottom-0 h-56 w-56 md:h-64 md:w-64"
            opacity={0.16}
            rotate={22}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FFE0B8]">
                For operators & hosts
              </p>
              <h2
                id="operators-heading"
                className="mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              >
                Put a juice bar on your floor without building a juice bar.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85">
                Valencia oranges. UPI. Sealed cups. Restocked like infrastructure â€”
                not like a cafÃ©. Turn idle wall space into a daily ritual.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#8B3410] transition-colors hover:bg-[#FFF5ED]"
                >
                  Place a machine
                </Link>
                <Link
                  href="/business-opportunity"
                  className="inline-flex items-center justify-center rounded-full border border-white/55 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Partnership models
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/orange1.png"
                  alt=""
                  width={380}
                  height={380}
                  className="relative z-[1] mx-auto h-auto w-[70%] object-contain"
                />
              </motion.div>
              <motion.div
                animate={reduce ? undefined : { y: [0, 8, 0], rotate: [6, 10, 6] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 bottom-4 w-28 md:w-36"
              >
                <Image
                  src="/orange3.png"
                  alt=""
                  width={200}
                  height={200}
                  className="h-auto w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {models.map((model, i) => (
            <motion.article
              key={model.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={reduce ? undefined : { y: -5 }}
              className="rounded-[1.6rem] border border-[#8B3410]/8 bg-white p-7"
            >
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#EE6F28]">
                {model.kicker}
              </p>
              <h3 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.02em] text-[#8B3410]">
                {model.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#8B3410]/65">
                {model.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
