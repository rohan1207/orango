"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { brand } from "@/lib/site";

const venues = [
  "Hospital",
  "Office",
  "Mall",
  "Gym",
  "Campus",
  "Transit",
  "Other",
];

const roles = [
  "Facility / F&B manager",
  "Property / mall manager",
  "Owner / director",
  "Franchisee / operator",
  "Investor",
  "Other",
];

export default function SiteSurveyForm({ defaultVenue = "" }) {
  const params = useSearchParams();
  const intent = params.get("intent");
  const venueFromUrl = params.get("venue") || defaultVenue;

  const initial = useMemo(
    () => ({
      name: "",
      phone: "",
      email: "",
      organisation: "",
      city: "",
      venue: venueFromUrl || "Mall",
      role: "Facility / F&B manager",
      message: "",
      consent: false,
    }),
    [venueFromUrl],
  );

  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `OranGo site survey — ${form.venue} — ${form.city || form.organisation}`,
    );
    const body = encodeURIComponent(
      `Intent: ${intent === "survey" ? "Book a site survey" : "Contact"}\nName: ${form.name}\nPhone: ${form.phone}\nWork email: ${form.email}\nOrganisation: ${form.organisation}\nCity: ${form.city}\nVenue type: ${form.venue}\nRole: ${form.role}\nConsent: yes\n\n${form.message}`,
    );
    window.location.href = `mailto:${brand.partnershipsEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-xl border border-[#8B3410]/12 bg-[#FFFAF6] px-3.5 py-3 text-[16px] text-[#8B3410] outline-none transition-colors placeholder:text-[#8B3410]/40 focus:border-[#EE6F28]/50 focus:bg-white sm:rounded-2xl sm:px-4 sm:py-3.5";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {intent === "survey" ? (
        <p className="md:col-span-2 rounded-xl border border-[#EE6F28]/25 bg-[#FFF5ED] px-4 py-3 text-[13px] text-[#8B3410]/80">
          You are requesting a <strong>site survey</strong>. We will confirm
          footprint, power, and loading access for your venue.
        </p>
      ) : null}

      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Name *
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
        Phone *
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
        Work email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@company.com"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Organisation
        <input
          name="organisation"
          value={form.organisation}
          onChange={onChange}
          placeholder="Mall, hospital, campus…"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        City
        <input
          name="city"
          value={form.city}
          onChange={onChange}
          placeholder="New Delhi"
          className={field}
        />
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px]">
        Venue type
        <select
          name="venue"
          value={form.venue}
          onChange={onChange}
          className={field}
        >
          {venues.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px] md:col-span-2">
        Role
        <select
          name="role"
          value={form.role}
          onChange={onChange}
          className={field}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B3410]/55 sm:text-[11px] md:col-span-2">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={4}
          placeholder="Footfall, preferred bay, timeline…"
          className={`${field} resize-y`}
        />
      </label>
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-[#8B3410]/70 md:col-span-2">
        <input
          required
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={onChange}
          className="mt-1 h-4 w-4 accent-[#EE6F28]"
        />
        I agree to be contacted by {brand.legalName} / {brand.name} about this
        enquiry.
      </label>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#EE6F28] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#D45A18] sm:w-auto"
        >
          Request a site survey
        </button>
        {sent ? (
          <p className="mt-3 text-[13px] text-[#8B3410]/70">
            Opening your email client… If nothing opens, write to{" "}
            <a
              className="text-[#EE6F28] underline"
              href={`mailto:${brand.partnershipsEmail}`}
            >
              {brand.partnershipsEmail}
            </a>{" "}
            or{" "}
            <a
              className="text-[#EE6F28] underline"
              href={brand.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp us
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
