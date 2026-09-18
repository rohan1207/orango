import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import OrangeSliceDecor from "./OrangeSliceDecor";
import { brand, footerLegal, footerQuickLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#EE6F28]/12 bg-[#FFFAF6] text-[#8B3410]">
      <OrangeSliceDecor
        className="-left-16 top-8 h-52 w-52 md:h-60 md:w-60"
        opacity={0.12}
        rotate={-20}
      />
      <OrangeSliceDecor
        className="-right-12 bottom-20 h-44 w-44 md:h-52 md:w-52"
        opacity={0.1}
        rotate={25}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#EE6F28]/12 bg-white p-8 md:p-10 lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#8B3410]/70">
              Automated Valencia orange juice for India&apos;s high-footfall
              floors. Host it, operate it, or build a city network with us.
            </p>
            <a
              href={brand.phoneHref}
              className="mt-7 inline-block text-[clamp(1.4rem,2.8vw,1.85rem)] font-semibold tracking-[-0.03em] text-[#EE6F28] transition-opacity hover:opacity-90"
            >
              {brand.phone}
            </a>
            <div className="mt-4 space-y-1.5 text-[14px] text-[#8B3410]/70">
              <a
                className="block w-fit transition-colors hover:text-[#EE6F28]"
                href={`mailto:${brand.email}`}
              >
                {brand.email}
              </a>
              <a
                className="block w-fit transition-colors hover:text-[#EE6F28]"
                href={`mailto:${brand.partnershipsEmail}`}
              >
                {brand.partnershipsEmail}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#EE6F28]/30 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8B3410] transition-colors hover:border-[#EE6F28] hover:bg-[#FFF5ED] hover:text-[#EE6F28]"
              >
                LinkedIn
              </a>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#EE6F28]/30 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8B3410] transition-colors hover:border-[#EE6F28] hover:bg-[#FFF5ED] hover:text-[#EE6F28]"
              >
                Instagram
              </a>
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-2 w-28 opacity-90 md:w-36">
              <Image
                src="/orange1.png"
                alt=""
                width={180}
                height={180}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-[1.6rem] border border-[#EE6F28]/12 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
                Quick Links
              </p>
              <ul className="mt-5 space-y-3">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] font-medium text-[#8B3410]/80 transition-colors hover:text-[#EE6F28]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.6rem] border border-[#EE6F28]/12 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
                Further Information
              </p>
              <ul className="mt-5 space-y-3">
                {footerLegal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] font-medium text-[#8B3410]/80 transition-colors hover:text-[#EE6F28]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="text-[14px] font-medium text-[#8B3410]/80 transition-colors hover:text-[#EE6F28]"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#D45A18]"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#EE6F28]/12 py-5 text-center text-[12px] tracking-wide text-[#8B3410]/50">
          Copyright 2026 Orango / All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
