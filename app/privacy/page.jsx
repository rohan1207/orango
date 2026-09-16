import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Privacy Policy",
  description: "How Orango collects and uses enquiry and website data.",
  alternates: { canonical: "https://orango.co.in/privacy" },
};

export default function PrivacyPage() {
  return (
    <article>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="We collect only what we need to answer a commercial or career enquiry, and to keep this site reliable."
      />
      <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 text-[15px] leading-relaxed text-muted md:px-8">
        <p>Last updated: 10 September 2026.</p>
        <section>
          <h2 className="font-display text-2xl text-ink">Data we collect</h2>
          <p className="mt-3">
            Name, email, phone, company, site type, and message when you submit
            a form or write to hello@orango.co.in or partnerships@orango.co.in.
            Server logs may include IP address, browser, and pages viewed.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">How we use it</h2>
          <p className="mt-3">
            To respond to placement, franchise, investment, and career
            conversations; to understand which locations are asking; and to keep
            the site secure. We do not sell personal data.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Sharing</h2>
          <p className="mt-3">
            We may share details with operations or legal advisors under
            confidentiality, or if required by Indian law. Hosting and email
            providers process data on our instructions.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Retention & rights</h2>
          <p className="mt-3">
            Enquiry records are kept as long as a commercial relationship is
            active or as required for legitimate business records. You may ask
            for access, correction, or deletion via hello@orango.co.in.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-3">
            Orango, Hauz Khas Enclave, New Delhi 110016. Phone +91 9599038388.
          </p>
        </section>
      </div>
    </article>
  );
}
