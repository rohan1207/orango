import Link from "next/link";
import { brand, primaryCta, secondaryCta } from "@/lib/site";

export const metadata = {
  title: "Thank you | Enquiry received",
  description:
    "Thank you for contacting OranGo. Our partnerships team will follow up on your site survey or enquiry.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://orango.co.in/thank-you" },
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-5 py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
        Thank you
      </p>
      <h1 className="mt-3 text-[clamp(1.8rem,5vw,2.8rem)] font-semibold tracking-[-0.03em] text-[#8B3410]">
        We have your enquiry.
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-[#8B3410]/70">
        If your email client opened, send the message to complete the request.
        Otherwise write to{" "}
        <a
          className="font-semibold text-[#EE6F28]"
          href={`mailto:${brand.partnershipsEmail}`}
        >
          {brand.partnershipsEmail}
        </a>{" "}
        or WhatsApp us.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={primaryCta.href}
          className="inline-flex rounded-full bg-[#EE6F28] px-6 py-3 text-[14px] font-semibold text-white"
        >
          {primaryCta.label}
        </Link>
        <Link
          href={secondaryCta.href}
          className="inline-flex rounded-full border border-[#8B3410]/15 px-6 py-3 text-[14px] font-semibold text-[#8B3410]"
        >
          {secondaryCta.label}
        </Link>
        <a
          href={brand.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-[#EE6F28]/35 px-6 py-3 text-[14px] font-semibold text-[#EE6F28]"
        >
          WhatsApp
        </a>
      </div>
    </main>
  );
}
