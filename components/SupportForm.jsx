"use client";

import { useState } from "react";
import { brand } from "@/lib/site";

const initial = {
  name: "",
  phone: "",
  email: "",
  utr: "",
  machineId: "",
  message: "",
};

export default function SupportForm() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `OranGo support — Machine ${form.machineId || "ID?"} — UTR ${form.utr || "n/a"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nUTR: ${form.utr}\nMachine ID: ${form.machineId}\n\nIssue:\n${form.message}\n\n(Please attach a photo of the machine screen if emailing.)`,
    );
    window.location.href = `mailto:${brand.supportEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-xl border border-[#8B3410]/12 bg-[#FFFAF6] px-3.5 py-3 text-[16px] text-[#8B3410] outline-none transition-colors placeholder:text-[#8B3410]/40 focus:border-[#EE6F28]/50 focus:bg-white sm:rounded-2xl sm:px-4 sm:py-3.5";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Name *
        <input
          required
          name="name"
          value={form.name}
          onChange={onChange}
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Phone *
        <input
          required
          name="phone"
          value={form.phone}
          onChange={onChange}
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        UTR / payment reference *
        <input
          required
          name="utr"
          value={form.utr}
          onChange={onChange}
          placeholder="UPI transaction ID"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px] md:col-span-2">
        Machine ID *
        <input
          required
          name="machineId"
          value={form.machineId}
          onChange={onChange}
          placeholder="Shown on the machine cabinet / screen"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px] md:col-span-2">
        What happened? *
        <textarea
          required
          name="message"
          value={form.message}
          onChange={onChange}
          rows={4}
          placeholder="Paid but no cup / machine error / other…"
          className={`${field} resize-y`}
        />
      </label>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
        >
          Email support
        </button>
        {sent ? (
          <p className="mt-3 text-[13px] text-[#8B3410]/70">
            Opening email to {brand.supportEmail}. Attach a photo of the machine
            screen for faster resolution.
          </p>
        ) : null}
      </div>
    </form>
  );
}
