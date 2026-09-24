"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { brand, navLinks, primaryCta } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const measure = () => {
      // Only the collapsed top bar — never include the open mobile menu,
      // or --nav-h balloons and pushes every page layout down.
      const bar = document.getElementById("site-nav-bar");
      const bottom = bar ? bar.getBoundingClientRect().bottom : 72;
      document.documentElement.style.setProperty(
        "--nav-h",
        `${Math.round(bottom)}px`,
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      id="site-nav"
      className="fixed inset-x-0 top-0 z-40 border-b border-black/8 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
    >
      <div
        id="site-nav-bar"
        className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 sm:h-[88px] sm:px-5 md:px-8 lg:h-[96px]"
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors xl:px-4 ${
                  active
                    ? "bg-[#FFF0E6] text-[#EE6F28]"
                    : "text-[#8B3410] hover:bg-[#8B3410]/[0.05] hover:text-[#EE6F28]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp OranGo"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#EE6F28]/25 text-[#EE6F28] transition-colors hover:border-[#EE6F28] hover:bg-[#FFF5ED]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <Link
            href={primaryCta.href}
            className="rounded-full bg-[#EE6F28] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#D45A18]"
          >
            {primaryCta.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-6 flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-[#EE6F28] transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-[#EE6F28] transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-black/6 bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-4 py-3.5 text-[17px] font-medium transition-colors ${
                      active
                        ? "bg-[#FFF0E6] text-[#EE6F28]"
                        : "text-[#8B3410] hover:bg-[#8B3410]/[0.05]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full border border-[#EE6F28]/30 px-6 py-3.5 text-[16px] font-medium text-[#EE6F28]"
              >
                WhatsApp
              </a>
              <Link
                href={primaryCta.href}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#EE6F28] px-6 py-3.5 text-[16px] font-medium text-white"
              >
                {primaryCta.label}
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
