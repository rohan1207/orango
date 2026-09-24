"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, primaryCta } from "@/lib/site";

export default function MobileStickyBar() {
  const pathname = usePathname();
  if (pathname === "/" || pathname?.startsWith("/thank-you")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#EE6F28]/15 bg-white/95 px-3 py-2.5 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={brand.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-[#EE6F28]/35 px-3 py-3 text-[13px] font-semibold text-[#EE6F28]"
        >
          WhatsApp
        </a>
        <Link
          href={primaryCta.href}
          className="inline-flex flex-[1.4] items-center justify-center rounded-full bg-[#EE6F28] px-3 py-3 text-[13px] font-semibold text-white"
        >
          Book a site survey
        </Link>
      </div>
    </div>
  );
}
