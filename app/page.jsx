import MachineHero from "@/components/MachineHero";
import ProcessSteps from "@/components/ProcessSteps";
import HealthBenefits from "@/components/HealthBenefits";
import SmartTech from "@/components/SmartTech";
import TrustStrip from "@/components/TrustStrip";
import CtaSection from "@/components/CtaSection";
import HomeFaq from "@/components/HomeFaq";
import ContactTeaser from "@/components/ContactTeaser";

export const metadata = {
  title: "Fresh orange juice vending machines for Indian public spaces",
  description:
    "OranGo serves 100% pure Valencia orange juice — freshly squeezed to order in under a minute. No additives, UPI payments, ozone sterilisation. Built for malls, offices, hospitals, and partners across India.",
  keywords: [
    "orange juice vending machine India",
    "freshly squeezed orange juice",
    "Valencia orange juice machine",
    "UPI juice vending",
    "healthy beverage for malls",
    "orange juice franchise India",
    "Orango",
    "OranGo",
  ],
  alternates: { canonical: "https://orango.co.in" },
  openGraph: {
    title: "Orango | Fresh orange juice vending for India",
    description:
      "100% pure Valencia orange juice, freshly squeezed to order. Place hygienic, UPI-native machines in high-footfall spaces.",
    url: "https://orango.co.in",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <MachineHero />
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
