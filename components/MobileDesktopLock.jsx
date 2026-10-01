"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MOBILE_BREAKPOINT } from "@/lib/frames";
import { brand } from "@/lib/site";

/**
 * Temporary phone lock while mobile scroll-frames are still in progress.
 * Desktop (≥768px) is unaffected.
 */
export default function MobileDesktopLock() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const sync = () => {
      setLocked(window.innerWidth < MOBILE_BREAKPOINT);
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    if (!locked) return undefined;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [locked]);

  if (!locked) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFAF6] px-6 text-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-lock-title"
      aria-describedby="mobile-lock-copy"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(238,111,40,0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(238,111,40,0.1), transparent 50%)",
        }}
      />

      <div className="relative z-10 flex max-w-sm flex-col items-center gap-6">
        <Image
          src="/logo.png"
          alt="OranGo"
          width={160}
          height={48}
          priority
          className="h-10 w-auto object-contain"
        />

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            Phone experience
          </p>
          <h1
            id="mobile-lock-title"
            className="text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-[#8B3410]"
          >
            Mobile frames are in progress
          </h1>
          <p
            id="mobile-lock-copy"
            className="text-[15px] leading-relaxed text-[#8B3410]/75"
          >
            The phone scroll experience is being finished and will be ready
            soon. For the full OranGo site right now, please visit on a
            desktop.
          </p>
        </div>

        <div className="w-full rounded-2xl border border-[#EE6F28]/20 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(139,52,16,0.06)]">
          <p className="text-[14px] font-medium text-[#8B3410]">
            Open this site on a laptop or desktop browser.
          </p>
          <p className="mt-1.5 text-[13px] text-[#8B3410]/60">
            {brand.url.replace(/^https?:\/\//, "")}
          </p>
        </div>

        <a
          href={brand.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
        >
          WhatsApp us meanwhile
        </a>
      </div>
    </div>
  );
}
