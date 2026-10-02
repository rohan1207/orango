import BrandRibbon from "@/components/BrandRibbon";
import ExperienceSection from "@/components/ExperienceSection";
import ProcessSteps from "@/components/ProcessSteps";
import HealthBenefits from "@/components/HealthBenefits";
import SmartTech from "@/components/SmartTech";
import TrustStrip from "@/components/TrustStrip";
import CtaSection from "@/components/CtaSection";
import HomeFaq from "@/components/HomeFaq";
import ContactTeaser from "@/components/ContactTeaser";

/** Shared sections below each home-variant hero */
export default function HomePageRest() {
  return (
    <>
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
