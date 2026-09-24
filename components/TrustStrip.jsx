"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "./LiveBlobs";
import OrangeSliceDecor from "./OrangeSliceDecor";

const proofs = [
  { value: "100%", label: "Pure juice", detail: "No sugar added" },
  { value: "45s", label: "Squeezed to order", detail: "You see it happen" },
  { value: "4°C", label: "Fruit kept cold", detail: "Always chilled" },
  { value: "UPI", label: "Easy payments", detail: "No cash needed" },
];

export default function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Why OranGo"
      className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20"
    >
      <LiveBlobs
        items={[
          {
            className: "right-[6%] top-[-8%] h-40 w-40 md:h-48 md:w-48",
            opacity: 0.18,
            delay: 0.2,
            rotate: [0, -8, 6, 0],
          },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-lg">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Why venues choose OranGo
            </p>
            <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#8B3410]">
              A healthier option on your floor — without opening a café.
            </h2>
          </div>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <Image
              src="/orange3.png"
              alt=""
              width={72}
              height={72}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
            <Link
              href="/partners"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:flex-none"
            >
              See partner models
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="relative overflow-hidden rounded-[1.6rem] border border-[#8B3410]/8 bg-[#FFF5ED] p-6"
            >
              <p className="text-[clamp(2rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-[#EE6F28]">
                {item.value}
              </p>
              <p className="mt-2 text-[15px] font-semibold text-[#8B3410]">
                {item.label}
              </p>
              <p className="mt-1 text-[13px] text-[#8B3410]/55">{item.detail}</p>
              <OrangeSliceDecor
                className="-bottom-5 -right-3 h-20 w-20"
                opacity={0.16}
                rotate={12}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
