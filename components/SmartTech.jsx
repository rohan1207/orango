"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "./LiveBlobs";

const features = [
  {
    title: "Oranges stored at 4°C",
    copy: "Whole fruit stays cold so every cup starts fresh.",
    live: "Cold chain",
  },
  {
    title: "UPI payments",
    copy: "Scan, pay, done — the way India already pays.",
    live: "Instant",
  },
  {
    title: "Scheduled self-cleaning",
    copy: "The machine cleans on a set cycle. Less work for your team.",
    live: "Auto cycle",
  },
  {
    title: "Ozone sterilisation",
    copy: "Extra hygiene for public spaces like malls and hospitals.",
    live: "Sanitised",
  },
  {
    title: "Sealed cup",
    copy: "Closed at dispense — clean to carry, clean to drink.",
    live: "Sealed cup",
  },
  {
    title: "Live tracking",
    copy: "We watch stock and uptime so the machine stays ready.",
    live: "Live ops",
  },
];

export default function SmartTech() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="tech-heading"
      className="relative overflow-hidden bg-[#FFFAF6] py-14 sm:py-20 md:py-28"
    >
      <LiveBlobs
        items={[
          {
            className: "left-[-8%] top-[6%] h-48 w-48 md:h-56 md:w-56",
            opacity: 0.14,
            delay: 0,
            rotate: [0, 10, -6, 0],
          },
          {
            className: "right-[-6%] bottom-[8%] h-44 w-44 md:h-52 md:w-52",
            opacity: 0.12,
            delay: 0.7,
            rotate: [0, -8, 10, 0],
          },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-[8%] rounded-[2rem] bg-[#EE6F28]/8" />
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/machine.png"
                alt="OranGo smart orange juice vending machine"
                width={900}
                height={1100}
                className="mx-auto h-auto w-full max-w-[240px] object-contain drop-shadow-[0_24px_48px_rgba(238,111,40,0.18)] sm:max-w-sm lg:max-w-none"
              />
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Inside the machine
            </p>
            <h2
              id="tech-heading"
              className="mt-3 text-[clamp(1.75rem,6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#8B3410]"
            >
              Built clean. Built for busy floors.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#8B3410]/65 sm:text-[16px]">
              Cold storage, UPI, ozone cleaning and sealed cups — so guests trust
              the juice and hosts trust the machine.
            </p>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
              {features.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-[1.35rem] border border-[#EE6F28]/12 bg-white p-4 sm:p-5 transition-colors hover:border-[#EE6F28]/28"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5ED] px-2.5 py-1 text-[11px] font-semibold text-[#EE6F28]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EE6F28]/40" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#EE6F28]" />
                    </span>
                    {item.live}
                  </span>
                  <h3 className="mt-3 text-[1.05rem] font-semibold tracking-[-0.02em] text-[#8B3410]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#8B3410]/60">
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
