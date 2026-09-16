"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const measure = () => {
      const nav = document.getElementById("site-nav");
      const bottom = nav ? nav.getBoundingClientRect().bottom : 96;
      document.documentElement.style.setProperty("--nav-h", `${Math.round(bottom)}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      id="site-nav"
      className="fixed inset-x-0 top-0 z-40 border-b border-black/8 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
    >
      <div className="mx-auto flex h-[88px] w-full max-w-[1280px] items-center justify-between px-5 md:px-8 lg:h-[96px]">
        <Logo />

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[16px] font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#0F3D37]"
                  : "text-[#0F3D37]/55 hover:text-[#0F3D37]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-[#0F3D37] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1A524A]"
          >
            Talk to us
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
              className={`block h-0.5 bg-[#0F3D37] transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-[#0F3D37] transition-transform duration-300 ${
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-3.5 text-[18px] font-medium ${
                    pathname === link.href
                      ? "bg-black/[0.04] text-[#0F3D37]"
                      : "text-[#0F3D37]/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0F3D37] px-6 py-3.5 text-[16px] font-medium text-white"
              >
                Talk to us
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
