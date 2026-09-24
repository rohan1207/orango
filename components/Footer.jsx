import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import OrangeSliceDecor from "./OrangeSliceDecor";
import {
  brand,
  footerLegal,
  footerQuickLinks,
  primaryCta,
} from "@/lib/site";

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

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-12 sm:pt-16 md:px-8 md:pt-20">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-[#EE6F28]/12 bg-white p-6 sm:rounded-[2rem] sm:p-8 md:p-10 lg:col-span-5">
            <Logo />
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#EE6F28]">
              {brand.legalName}
            </p>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#8B3410]/70 sm:text-[15px]">
              Automated Valencia orange juice vending machines for Indian malls,
              hospitals, offices, and gyms. Fresh juice. Automated.
            </p>
            <a
              href={brand.phoneHref}
              className="mt-6 inline-block text-[clamp(1.25rem,5vw,1.85rem)] font-semibold tracking-[-0.03em] text-[#EE6F28] transition-opacity hover:opacity-90 sm:mt-7"
            >
              {brand.phone}
            </a>
            <div className="mt-4 space-y-1.5 break-all text-[13px] text-[#8B3410]/70 sm:break-normal sm:text-[14px]">
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
              <a
                className="block w-fit transition-colors hover:text-[#EE6F28]"
                href={`mailto:${brand.supportEmail}`}
              >
                {brand.supportEmail}
              </a>
              <a
                className="block w-fit transition-colors hover:text-[#EE6F28]"
                href={brand.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <p className="mt-5 text-[12px] leading-relaxed text-[#8B3410]/55">
              {brand.addressFull}
              <br />
              GSTIN: {brand.gstin} · FSSAI: {brand.fssai}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
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
            <div className="pointer-events-none absolute -bottom-4 -right-2 hidden w-28 opacity-90 sm:block md:w-36">
              <Image
                src="/orange1.png"
                alt=""
                width={180}
                height={180}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:col-span-7 lg:gap-4">
            <div className="md:rounded-[1.4rem] md:border md:border-[#EE6F28]/12 md:bg-white md:p-5 lg:rounded-[1.6rem] lg:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
                Quick Links
              </p>
              <ul className="mt-3 space-y-2 md:mt-5 md:space-y-3">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-medium text-[#8B3410]/80 transition-colors hover:text-[#EE6F28] md:text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:rounded-[1.4rem] md:border md:border-[#EE6F28]/12 md:bg-white md:p-5 lg:rounded-[1.6rem] lg:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EE6F28]">
                Further Information
              </p>
              <ul className="mt-3 space-y-2 md:mt-5 md:space-y-3">
                {footerLegal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-medium text-[#8B3410]/80 transition-colors hover:text-[#EE6F28] md:text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="text-[13px] font-medium text-[#8B3410]/80 transition-colors hover:text-[#EE6F28] md:text-[14px]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <Link
                href={primaryCta.href}
                className="mt-5 hidden items-center justify-center rounded-full bg-[#EE6F28] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#D45A18] md:mt-8 md:inline-flex"
              >
                {primaryCta.label}
              </Link>
            </div>

            <Link
              href={primaryCta.href}
              className="col-span-2 inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#D45A18] md:hidden"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>

        <div className="mt-8 space-y-2 border-t border-[#EE6F28]/12 py-5 text-center text-[12px] tracking-wide text-[#8B3410]/50">
          <p>
            Copyright 2026 {brand.legalName} / {brand.name}. All Rights
            Reserved.
          </p>
          <p>
            Designed &amp; developed by{" "}
            <span className="font-medium text-[#8B3410]/70">Stelora Media</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
