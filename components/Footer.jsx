import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import OrangeSliceDecor from "./OrangeSliceDecor";
import { brand, footerLegal, footerQuickLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#EE6F28] text-white">
      <OrangeSliceDecor
        className="-left-16 top-8 h-52 w-52 md:h-60 md:w-60"
        opacity={0.18}
        rotate={-20}
      />
      <OrangeSliceDecor
        className="-right-12 bottom-20 h-44 w-44 md:h-52 md:w-52"
        opacity={0.14}
        rotate={25}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#EE6F28] p-8 md:p-10 lg:col-span-5">
            <Logo invert />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/85">
              Automated Valencia orange juice for India&apos;s high-footfall
              floors. Host it, operate it, or build a city network with us.
            </p>
            <a
              href={brand.phoneHref}
              className="mt-7 inline-block text-[clamp(1.4rem,2.8vw,1.85rem)] font-semibold tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
            >
              {brand.phone}
            </a>
            <div className="mt-4 space-y-1.5 text-[14px] text-white/80">
              <a className="block w-fit hover:text-white" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
              <a
                className="block w-fit hover:text-white"
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
                className="rounded-full border border-white/35 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
              >
                LinkedIn
              </a>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/35 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
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
            <div className="rounded-[1.6rem] bg-white/[0.07] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Quick Links
              </p>
              <ul className="mt-5 space-y-3">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/75 transition-colors hover:text-[#FFB45C]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.6rem] bg-white/[0.07] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Further Information
              </p>
              <ul className="mt-5 space-y-3">
                {footerLegal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/75 transition-colors hover:text-[#FFB45C]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="text-[14px] text-white/75 transition-colors hover:text-[#FFB45C]"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#8B3410] transition-colors hover:bg-[#FFF5ED]"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 py-5 text-center text-[12px] tracking-wide text-white/40">
          Copyright 2026 Orango / All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
