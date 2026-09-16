import MagneticButton from "@/components/MagneticButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { shopOffers } from "@/lib/site";

export const metadata = {
  title: "Shop — place an Orango machine",
  description:
    "Site placement, multi-machine networks, and franchise conversations for Orango fresh juice vending. Start with the floor you already operate.",
  alternates: { canonical: "https://orango.co.in/shop" },
};

export default function ShopPage() {
  return (
    <article>
      <PageHero
        eyebrow="Shop / deploy"
        title="This is not a bottle shop. It is a machine on your floor."
        lede="Orango sells access: a hygienic, UPI-native juice node for spaces that already have traffic. Pick the conversation that matches how you operate."
      />

      <section className="mx-auto grid max-w-[1440px] gap-6 px-5 py-16 md:grid-cols-3 md:px-8 md:py-24">
        {shopOffers.map((offer, i) => (
          <Reveal
            key={offer.title}
            delay={i * 0.08}
            className={`flex flex-col rounded-[1.8rem] p-8 transition-transform duration-500 hover:-translate-y-2 ${
              i === 1 ? "bg-ink text-cream" : "bg-cream"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
                i === 1 ? "text-orange" : "text-muted"
              }`}
            >
              {offer.price}
            </p>
            <h2 className="font-display mt-4 text-3xl tracking-tight">{offer.title}</h2>
            <ul className="mt-6 flex-1 space-y-3">
              {offer.points.map((point) => (
                <li
                  key={point}
                  className={`text-sm leading-relaxed ${i === 1 ? "text-cream/70" : "text-muted"}`}
                >
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MagneticButton
                href="/contact"
                variant={i === 1 ? "primary" : "dark"}
              >
                Start briefing
              </MagneticButton>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-line px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <h2 className="font-display max-w-3xl text-3xl tracking-tight md:text-5xl">
              What we need from you to price a site honestly.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {["Footfall band", "Power & water access", "Who owns the floor", "How many sites later"].map(
              (item, i) => (
                <Reveal key={item} delay={i * 0.06} className="border-t border-line pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
                    0{i + 1}
                  </p>
                  <p className="mt-3 text-lg">{item}</p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
