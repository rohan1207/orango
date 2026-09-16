"use client";

import { useRef } from "react";
import Link from "next/link";

const variants = {
  primary:
    "bg-orange text-cream hover:bg-orange-deep shadow-[0_10px_30px_rgba(238,90,36,0.28)]",
  dark: "bg-ink text-cream hover:bg-ink-soft",
  ghost:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03]",
  light:
    "bg-cream text-ink hover:bg-white border border-white/10",
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  type,
  onClick,
}) {
  const ref = useRef(null);

  const onMove = (event) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.24}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const inner = (
    <span
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-[transform,background-color,border-color,color] duration-300 ease-out active:scale-[0.97] ${variants[variant]} ${className}`}
    >
      {children}
      <span aria-hidden className="text-base leading-none">
        →
      </span>
    </span>
  );

  const wrapClass = "inline-flex";

  if (!href) {
    return (
      <button
        type={type || "button"}
        className={wrapClass}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {inner}
      </button>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={wrapClass}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={wrapClass}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {inner}
    </Link>
  );
}
