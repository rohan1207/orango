"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";

export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-grid divide-y divide-line border-t border-line">
      {faqs.map((item, i) => {
        const active = open === i;
        return (
          <button
            key={item.q}
            type="button"
            onClick={() => setOpen(active ? -1 : i)}
            className="group flex w-full items-start justify-between gap-3 py-4 text-left sm:gap-6 sm:py-6"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-medium tracking-tight sm:text-lg md:text-xl">
                {item.q}
              </span>
              <span
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <span className="overflow-hidden">
                  <span className="mt-2.5 block max-w-2xl text-[13px] leading-relaxed text-muted sm:mt-3 sm:text-sm">
                    {item.a}
                  </span>
                </span>
              </span>
            </span>
            <span
              className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-lg transition-transform duration-500 ${
                active ? "rotate-45 bg-ink text-cream" : "bg-transparent"
              }`}
            >
              +
            </span>
          </button>
        );
      })}
    </div>
  );
}
