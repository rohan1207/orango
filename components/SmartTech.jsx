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
      className="relative overflow-hidden bg-[#FFFAF6] py-12 sm:py-16 lg:flex lg:h-[calc(100dvh-var(--nav-h))] lg:items-stretch lg:py-0"
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 py-0 lg:px-8 lg:py-6 xl:py-8">
        <div className="grid h-full min-h-0 flex-1 items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:gap-14">
          {/* Left image — matches right column height on desktop */}
          <div className="relative order-2 flex h-[min(58vw,360px)] min-h-[260px] items-center justify-center sm:h-[380px] lg:order-1 lg:h-full lg:min-h-0">
            <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[#EE6F28]/8" />
            <motion.div
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-[1] flex h-full w-full items-center justify-center p-1 sm:p-2"
            >
              <Image
                src="/internal.png"
                alt="Inside the OranGo machine"
                width={900}
                height={1100}
                sizes="(max-width: 1024px) 70vw, 42vw"
                className="h-full w-auto max-w-full rounded-3xl object-contain drop-shadow-[0_24px_48px_rgba(238,111,40,0.18)]"
              />
            </motion.div>
          </div>

          {/* Right content */}
          <div className="order-1 flex min-h-0 flex-col justify-center lg:order-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Inside the machine
            </p>
            <h2
              id="tech-heading"
              className="mt-2 text-[clamp(1.6rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#8B3410] lg:mt-2.5"
            >
              Built clean. Built for busy floors.
            </h2>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#8B3410]/65 sm:text-[15px] lg:mt-3.5">
              Cold storage, UPI, ozone cleaning and sealed cups — so guests trust
              the juice and hosts trust the machine.
            </p>

            <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:mt-5 xl:mt-6">
              {features.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-[1.2rem] border border-[#EE6F28]/12 bg-white p-3.5 transition-colors hover:border-[#EE6F28]/28 sm:p-4 lg:p-3.5 xl:p-4"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5ED] px-2.5 py-1 text-[10px] font-semibold text-[#EE6F28] sm:text-[11px]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EE6F28]/40" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#EE6F28]" />
                    </span>
                    {item.live}
                  </span>
                  <h3 className="mt-2 text-[0.95rem] font-semibold tracking-[-0.02em] text-[#8B3410] sm:mt-2.5 sm:text-[1.02rem] lg:text-[0.98rem] xl:text-[1.05rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#8B3410]/60 sm:text-[13px] lg:line-clamp-2">
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
