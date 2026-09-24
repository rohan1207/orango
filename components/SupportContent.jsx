"use client";

import Link from "next/link";
import { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "@/components/LiveBlobs";
import SupportForm from "@/components/SupportForm";
import { brand } from "@/lib/site";

export default function SupportContent() {
  const reduce = useReducedMotion();

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
            Support
          </p>
          <h1 className="mt-2.5 max-w-3xl text-[clamp(1.75rem,7vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#8B3410]">
            Failed vend? We resolve it.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8B3410]/70 sm:text-[16px]">
            If payment succeeded but the machine did not dispense, share your
            UTR, Machine ID, and a photo. This matches our{" "}
            <Link href="/refund" className="font-semibold text-[#EE6F28]">
              refund policy
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-[14px] text-[#8B3410]/75">
            <a
              href={`mailto:${brand.supportEmail}`}
              className="font-semibold text-[#EE6F28]"
            >
              {brand.supportEmail}
            </a>
            <a href={brand.phoneHref} className="hover:text-[#EE6F28]">
              {brand.phone}
            </a>
            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#EE6F28]"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[800px] px-4 pb-16 sm:px-5 md:px-8">
        <div className="rounded-[1.75rem] border border-[#8B3410]/8 bg-white p-6 sm:p-8 md:p-10">
          <h2 className="text-[20px] font-semibold text-[#8B3410]">
            Failed vend form
          </h2>
          <p className="mt-2 text-[14px] text-[#8B3410]/65">
            Required: UTR + Machine ID + description. Attach a photo when your
            email client opens.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-[#8B3410]/60">Loading form…</p>}>
              <SupportForm />
            </Suspense>
          </div>
        </div>
      </section>
    </article>
  );
}
