"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "./LiveBlobs";

const features = [
  {
    title: "Oranges stored at 4Â°C",
    copy: "Fresh oranges and naturally chilled juice.",
    live: "Cold chain",
  },
  {
    title: "UPI enabled payments",
    copy: "Seamless tap-and-pay experience.",
    live: "Instant",
  },
  {
    title: "Scheduled self-cleaning",
    copy: "Regular cleaning intervals, automated.",
    live: "Auto cycle",
  },
  {
    title: "Ozone sterilization",
    copy: "Enhanced hygiene for public floors.",
    live: "Sanitised",
  },
  {
    title: "Sealed for maximum benefits",
    copy: "Preserves nutrients and freshness.",
    live: "Sealed cup",
  },
  {
    title: "Daily tracking",
    copy: "For regular replenishment and uptime.",
    live: "Live ops",
  },
];

export default function SmartTech() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="tech-heading"
      className="relative overflow-hidden bg-[#EE6F28] py-20 text-white md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(145deg, #FF8F3D 0%, #F07A32 45%, #EE6F28 100%)",
        }}
      />
      <LiveBlobs
        items={[
          {
            className: "left-[-8%] top-[6%] h-48 w-48 md:h-56 md:w-56",
            opacity: 0.2,
            delay: 0,
            rotate: [0, 10, -6, 0],
          },
          {
            className: "right-[-6%] bottom-[8%] h-44 w-44 md:h-52 md:w-52",
            opacity: 0.16,
            delay: 0.7,
            rotate: [0, -8, 10, 0],
          },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative">
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/machine.png"
                alt="Orango smart juice vending machine"
                width={900}
                height={1100}
                className="mx-auto h-auto w-full max-w-md object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] lg:max-w-none"
              />
            </motion.div>
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-2 bottom-[18%] w-24 md:w-32"
            >
              <Image
                src="/jar.png"
                alt=""
                width={200}
                height={200}
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FFE0B8]">
              Smart technology
            </p>
            <h2
              id="tech-heading"
              className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
            >
              Built for trust and convenience
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/85">
              Hygiene, payments, and cold-chain â€” engineered into every OranGo
              machine so hosts get reliability and guests get confidence.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-[1.35rem] border border-white/20 bg-white/10 p-5 backdrop-blur-[2px] transition-colors hover:bg-white/16"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-[#A8F0C0]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A8F0C0]/5" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#A8F0C0]" />
                    </span>
                    {item.live}
                  </span>
                  <h3 className="mt-3 text-[1.05rem] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/75">
                    {item.copy}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
