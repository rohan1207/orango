import MagneticButton from "@/components/MagneticButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { brand, careers } from "@/lib/site";

export const metadata = {
  title: "Careers | Join OranGo / INNOVERTEX LLP",
  description:
    "Careers at OranGo (INNOVERTEX LLP). Roles in city launch, partnerships, and field operations for fresh orange juice vending across India.",
  alternates: { canonical: "https://orango.co.in/career" },
  openGraph: {
    title: "Careers at OranGo",
    description: "Help place fresh juice machines across Indian public space.",
    url: "https://orango.co.in/career",
  },
};

export default function CareerPage() {
  return (
    <article>
      <PageHero
        eyebrow="Careers"
        title="Help put juice on floors that currently only sell fizz."
        lede="OranGo is built by INNOVERTEX LLP in Delhi. We are hiring people who like landlords, logistics, and fruit quality equally."
      />

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-4">
          {careers.map((role, i) => (
            <Reveal
              key={role.title}
              delay={i * 0.06}
              className="group flex flex-col justify-between gap-6 rounded-[1.6rem] border border-line bg-cream p-8 transition-colors duration-500 hover:border-orange/40 hover:bg-white md:flex-row md:items-center"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange">
                  {role.type}
                </p>
                <h2 className="font-display mt-2 text-3xl tracking-tight">
                  {role.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {role.copy}
                </p>
              </div>
              <MagneticButton
                href={`mailto:${brand.email}?subject=${encodeURIComponent("Application — " + role.title)}`}
                variant="dark"
              >
                Apply
              </MagneticButton>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 max-w-2xl">
          <h2 className="font-display text-3xl tracking-tight">
            No listing that fits?
          </h2>
          <p className="mt-4 text-muted">
            Send a short note on the cities you know, the operators you already
            talk to, or the operations problem you have already solved.
          </p>
          <div className="mt-6">
            <MagneticButton href={`mailto:${brand.email}`}>
              Open application
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
