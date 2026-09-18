"use client";

import { useState } from "react";

const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  site: "Mall",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Orango enquiry — ${form.site} — ${form.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nSite type: ${form.site}\n\n${form.message}`,
    );
    window.location.href = `mailto:partnerships@orango.co.in?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-xl border border-[#8B3410]/12 bg-[#FFFAF6] px-3.5 py-3 text-sm text-[#8B3410] outline-none transition-colors placeholder:text-[#8B3410]/40 focus:border-[#EE6F28]/50 focus:bg-white sm:rounded-2xl sm:px-4 sm:py-3.5";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Name
        <input
          required
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Email
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Work email"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Phone
        <input
          required
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="+91…"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Company / property
        <input
          name="company"
          value={form.company}
          onChange={onChange}
          placeholder="Group, mall, hospital, campus…"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px] md:col-span-2">
        Site type
        <select
          name="site"
          value={form.site}
          onChange={onChange}
          className={field}
        >
          <option>Mall</option>
          <option>Corporate campus</option>
          <option>Hospital</option>
          <option>Gym / club</option>
          <option>Hotel</option>
          <option>Transit</option>
          <option>University</option>
          <option>Investment / franchise</option>
          <option>Other</option>
        </select>
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px] md:col-span-2">
        Message
        <textarea
          required
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Footfall, number of sites, city, and what a useful conversation looks like."
          rows={5}
          className={`${field} resize-y`}
        />
      </label>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
        >
          {sent ? "Opening mail…" : "Send brief"}
        </button>
        <p className="mt-3 text-[11px] leading-relaxed text-[#8B3410]/50 sm:text-[12px]">
          Submitting opens your email client addressed to partnerships@orango.co.in.
        </p>
      </div>
    </form>
  );
}
