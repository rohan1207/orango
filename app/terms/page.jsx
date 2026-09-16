import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of the Orango website and commercial discussions.",
  alternates: { canonical: "https://orango.co.in/terms" },
};

export default function TermsPage() {
  return (
    <article>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lede="These terms cover use of orango.co.in and preliminary commercial conversations. Machine placement agreements are issued separately."
      />
      <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 text-[15px] leading-relaxed text-muted md:px-8">
        <p>Last updated: 10 September 2026.</p>
        <section>
          <h2 className="font-display text-2xl text-ink">1. Who we are</h2>
          <p className="mt-3">
            Orango (“we”, “us”) operates this website from Hauz Khas Enclave, New
            Delhi 110016. Contact hello@orango.co.in or +91 9599038388.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">2. What this site is</h2>
          <p className="mt-3">
            The site describes juice vending infrastructure and partnership
            models. It is not an offer to sell consumer packaged goods, nor a
            binding franchise prospectus. Any pricing, yield, or rollout figures
            discussed are indicative until a written agreement is signed.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">3. Enquiries</h2>
          <p className="mt-3">
            Forms and emails you send may be used to assess site fit, follow up,
            and improve our commercial process. Do not send confidential
            information you are not willing to discuss with our team.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">4. Intellectual property</h2>
          <p className="mt-3">
            Orango names, marks, copy, and site design are owned by us or our
            licensors. You may not copy the brand system or machine imagery for
            competing products without written consent.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">5. Liability</h2>
          <p className="mt-3">
            Website content is provided as-is. We are not liable for decisions
            made solely on marketing copy. Operational hygiene, fruit quality,
            and commercial terms are governed by the machine agreement, not this
            page.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">6. Governing law</h2>
          <p className="mt-3">
            These terms are governed by the laws of India. Courts in New Delhi
            have exclusive jurisdiction, subject to applicable law.
          </p>
        </section>
      </div>
    </article>
  );
}
