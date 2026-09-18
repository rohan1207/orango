"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/lib/site";
import LiveBlobs from "./LiveBlobs";

export default function HomeFaq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-white py-14 sm:py-20 md:py-28"
    >
      <LiveBlobs />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-start gap-8 px-5 md:grid-cols-12 md:gap-10 md:px-8">
        <div className="md:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            FAQs
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-[clamp(1.9rem,3.6vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#8B3410]"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#8B3410]/65">
            Have a question about OranGo? We&apos;ve covered the most common ones
            here. Reach out if you need more.
          </p>

          <div className="relative mt-6 hidden max-w-[160px] sm:block md:max-w-[180px]">
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/jar.png"
                alt=""
                width={200}
                height={200}
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="space-y-3">
            {faqs.map((item, i) => {
              const active = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`overflow-hidden rounded-[1.4rem] border transition-all ${
                    active
                      ? "border-transparent bg-[#EE6F28] text-white"
                      : "border-[#8B3410]/8 bg-[#FFF5ED] text-[#8B3410]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(active ? -1 : i)}
                    className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4 md:px-6 md:py-5"
                    aria-expanded={active}
                  >
                    <span className="text-[14px] font-semibold tracking-[-0.01em] sm:text-[15px] md:text-[16px]">
                      {item.q}
                    </span>
                    <span
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg transition-all ${
                        active
                          ? "rotate-45 bg-white text-[#EE6F28]"
                          : "bg-white text-[#EE6F28]"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                      >
                        <p className="px-4 pb-4 text-[13px] leading-relaxed text-white/85 sm:px-5 sm:pb-5 sm:text-[14px] md:px-6">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-stretch sm:justify-end">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
