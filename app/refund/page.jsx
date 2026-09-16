import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Refund Policy",
  description: "Refunds for Orango juice purchases at machines and for commercial deposits.",
  alternates: { canonical: "https://orango.co.in/refund" },
};

export default function RefundPage() {
  return (
    <article>
      <PageHero
        eyebrow="Legal"
        title="Refund Policy"
        lede="Guest pours and partner deposits are treated differently. This page explains both in plain language."
      />
      <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 text-[15px] leading-relaxed text-muted md:px-8">
        <p>Last updated: 10 September 2026.</p>
        <section>
          <h2 className="font-display text-2xl text-ink">At the machine</h2>
          <p className="mt-3">
            Orango juice is made to order. If a vend fails after payment — no
            cup, incomplete dispense, or an obvious machine fault — contact the
            number on the machine or +91 9599038388 with the time, location, and
            UPI reference. Valid failed vends are refunded to the original
            payment method or issued as a complimentary vend, typically within
            7 working days of verification.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Taste & preference</h2>
          <p className="mt-3">
            Because the drink is perishable and prepared after payment, we do
            not refund completed, collected cups for change of mind.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Partnership deposits</h2>
          <p className="mt-3">
            Hosting, franchise, or equipment deposits follow the written
            commercial agreement. Website copy does not create a cooling-off
            right beyond what that agreement and applicable law provide.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">How to raise a request</h2>
          <p className="mt-3">
            Email hello@orango.co.in with your name, phone, site, transaction
            ID, and a short description. Partnership refund questions go to
            partnerships@orango.co.in.
          </p>
        </section>
      </div>
    </article>
  );
}
