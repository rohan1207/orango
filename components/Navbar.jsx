"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { brand, navLinks, primaryCta } from "@/lib/site";

const HOME_PATHS = new Set([
  "/home",
  "/home1",
  "/home2",
  "/home3",
  "/home4",
]);

/** Temporary client-preview options — remove when one home is chosen */
const HOME_VARIANTS = [
  {
    href: "/home1",
    label: "Home 1",
    note: "Scroll frames (set 1)",
  },
  {
    href: "/home2",
    label: "Home 2",
    note: "3D + steps",
  },
  {
    href: "/home3",
    label: "Home 3",
    note: "Scroll frames (set 3)",
  },
  {
    href: "/home4",
    label: "Home 4",
    note: "Scroll frames (set 4)",
  },
];

function currentHomeLabel(pathname) {
  const match = HOME_VARIANTS.find((v) => v.href === pathname);
  return match?.label ?? "Home";
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [overHero, setOverHero] = useState(HOME_PATHS.has(pathname));
  const homeMenuRef = useRef(null);

  useEffect(() => {
    const measure = () => {
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
    setHomeOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!homeOpen) return undefined;
    const onPointer = (e) => {
      if (!homeMenuRef.current?.contains(e.target)) setHomeOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setHomeOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [homeOpen]);

  // Transparent only while the home scroll-hero is still covering the viewport
  useEffect(() => {
    if (!HOME_PATHS.has(pathname)) {
      setOverHero(false);
      return undefined;
    }

    let last = null;
    let ticking = false;

    const compute = () => {
      ticking = false;
      const hero = document.getElementById("home-scroll-hero");
      if (!hero) {
        if (last !== true) {
          last = true;
          setOverHero(true);
        }
        return;
      }
      const rect = hero.getBoundingClientRect();
      const next = rect.bottom > window.innerHeight * 0.45;
      if (next !== last) {
        last = next;
        setOverHero(next);
      }
    };

    const sync = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const transparent = overHero && !open;
  const homeActive = HOME_PATHS.has(pathname);
  const selectValue = HOME_PATHS.has(pathname) ? pathname : "/home1";

  return (
    <header
      id="site-nav"
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent shadow-none"
          : "border-b border-black/8 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      }`}
    >
      <div
        id="site-nav-bar"
        className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 sm:h-[88px] sm:px-5 md:px-8 lg:h-[96px]"
      >
        <Logo />

        {/* Desktop menus: hidden over transparent hero, instant show when solid */}
        <nav
          className={`items-center gap-1 xl:gap-1.5 ${
            transparent ? "hidden" : "hidden lg:flex"
          }`}
          aria-hidden={transparent || undefined}
        >
          {/* Temporary home-variant picker for client review */}
          <div ref={homeMenuRef} className="relative">
            <button
              type="button"
              aria-expanded={homeOpen}
              aria-haspopup="listbox"
              onClick={() => setHomeOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors xl:px-4 ${
                homeActive
                  ? "bg-[#FFF0E6] text-[#EE6F28]"
                  : "text-[#8B3410] hover:bg-[#8B3410]/[0.05] hover:text-[#EE6F28]"
              }`}
            >
              {currentHomeLabel(pathname)}
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform ${homeOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path
                  d="M2.5 4.5L6 8l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AnimatePresence>
              {homeOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16 }}
                  role="listbox"
                  aria-label="Home page variants"
                  className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[240px] overflow-hidden rounded-2xl border border-[#EE6F28]/15 bg-white py-2 shadow-[0_12px_40px_rgba(139,52,16,0.12)]"
                >
                  <p className="px-4 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EE6F28]/80">
                    Preview homes
                  </p>
                  {HOME_VARIANTS.map((variant) => {
                    const active = pathname === variant.href;
                    return (
                      <Link
                        key={variant.href}
                        href={variant.href}
                        role="option"
                        aria-selected={active}
                        onClick={() => setHomeOpen(false)}
                        className={`mx-1.5 flex flex-col rounded-xl px-3 py-2.5 transition-colors ${
                          active
                            ? "bg-[#FFF0E6] text-[#EE6F28]"
                            : "text-[#8B3410] hover:bg-[#8B3410]/[0.04]"
                        }`}
                      >
                        <span className="text-[14px] font-semibold">
                          {variant.label}
                        </span>
                        <span
                          className={`text-[12px] ${
                            active ? "text-[#EE6F28]/75" : "text-[#8B3410]/55"
                          }`}
                        >
                          {variant.note}
                        </span>
                      </Link>
                    );
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {navLinks
            .filter((link) => link.href !== "/home1")
            .map((link) => {
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

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Always visible so client can switch even over the hero */}
          <label className="relative inline-flex">
            <span className="sr-only">Choose home variant</span>
            <select
              aria-label="Choose home variant to preview"
              value={selectValue}
              onChange={(e) => {
                const href = e.target.value;
                if (href && href !== pathname) router.push(href);
              }}
              className={`h-9 cursor-pointer appearance-none rounded-full border py-0 pl-3 pr-7 text-[12px] font-semibold outline-none transition-colors sm:h-10 sm:pl-3.5 sm:pr-8 sm:text-[13px] ${
                transparent
                  ? "border-white/45 bg-white/25 text-[#8B3410] backdrop-blur-sm"
                  : "border-[#EE6F28]/25 bg-white text-[#8B3410]"
              }`}
            >
              {HOME_VARIANTS.map((v) => (
                <option key={v.href} value={v.href}>
                  {v.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#EE6F28] sm:right-3"
            >
              ▾
            </span>
          </label>

          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp OranGo"
            className={`hidden h-11 w-11 place-items-center rounded-full border text-[#EE6F28] transition-colors hover:border-[#EE6F28] hover:bg-[#FFF5ED] lg:grid ${
              transparent
                ? "border-white/40 bg-white/15 backdrop-blur-sm"
                : "border-[#EE6F28]/25"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <Link
            href={primaryCta.href}
            className="hidden rounded-full bg-[#EE6F28] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#D45A18] lg:inline-flex"
          >
            {primaryCta.label}
          </Link>

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
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EE6F28]">
                Preview homes
              </p>
              {HOME_VARIANTS.map((variant) => {
                const active = pathname === variant.href;
                return (
                  <Link
                    key={variant.href}
                    href={variant.href}
                    className={`rounded-full px-4 py-3 text-[16px] font-medium transition-colors ${
                      active
                        ? "bg-[#FFF0E6] text-[#EE6F28]"
                        : "text-[#8B3410] hover:bg-[#8B3410]/[0.05]"
                    }`}
                  >
                    {variant.label}
                    <span className="ml-2 text-[12px] font-normal opacity-60">
                      {variant.note}
                    </span>
                  </Link>
                );
              })}

              <div className="my-3 h-px bg-black/6" />

              {navLinks
                .filter((link) => link.href !== "/home1")
                .map((link) => {
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
