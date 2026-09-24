import MachineHero from "@/components/MachineHero";
import BrandRibbon from "@/components/BrandRibbon";
import ExperienceSection from "@/components/ExperienceSection";
import ProcessSteps from "@/components/ProcessSteps";
import HealthBenefits from "@/components/HealthBenefits";
import SmartTech from "@/components/SmartTech";
import TrustStrip from "@/components/TrustStrip";
import CtaSection from "@/components/CtaSection";
import HomeFaq from "@/components/HomeFaq";
import ContactTeaser from "@/components/ContactTeaser";

export const metadata = {
  title: "OranGo | Fresh Orange Juice Vending Machines in India",
  description:
    "Automated machines that squeeze Valencia oranges in 45 seconds. No sugar, no preservatives, UPI. Place OranGo in malls, hospitals, offices and gyms. From ₹120. Book a site survey.",
  keywords: [
    "orange juice vending machine India",
    "freshly squeezed orange juice",
    "Valencia orange juice machine",
    "UPI juice vending",
    "OranGo",
    "book site survey juice machine",
  ],
  alternates: { canonical: "https://orango.co.in/home" },
  openGraph: {
    title: "OranGo | Fresh Orange Juice Vending Machines in India",
    description:
      "100% Valencia oranges. ~45 seconds. UPI. Sealed cup. Built for malls, hospitals, offices and gyms.",
    url: "https://orango.co.in/home",
    type: "website",
    images: [{ url: "/machine.png", alt: "OranGo vending machine" }],
  },
};

export default function HomePage() {
  return (
    <>
      <MachineHero />
      <BrandRibbon />
      <ExperienceSection />
      <ProcessSteps />
      <HealthBenefits />
      <SmartTech />
      <TrustStrip />
      <CtaSection />
      <HomeFaq />
      <ContactTeaser />
    </>
  );
}
