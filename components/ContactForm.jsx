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
    "mt-2 w-full rounded-2xl border border-[#0F3D37]/12 bg-[#F7FBFA] px-4 py-3.5 text-sm text-[#0F3D37] outline-none transition-colors placeholder:text-[#0F3D37]/40 focus:border-[#EE6F28]/50 focus:bg-white";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F3D37]/55">
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
      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F3D37]/55">
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
      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F3D37]/55">
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
      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F3D37]/55">
        Company / property
        <input
          name="company"
          value={form.company}
          onChange={onChange}
          placeholder="Group, mall, hospital, campus…"
          className={field}
        />
      </label>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F3D37]/55 md:col-span-2">
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
      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F3D37]/55 md:col-span-2">
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
        <p className="mt-3 text-[12px] leading-relaxed text-[#0F3D37]/50">
          Submitting opens your email client addressed to partnerships@orango.co.in.
        </p>
      </div>
    </form>
  );
}
