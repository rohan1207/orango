import MachineHero from "@/components/MachineHero";
import Hero3, { HOME2_STEPS } from "@/components/Hero3";
import HomePageRest from "@/components/HomePageRest";

export const metadata = {
  title: "OranGo | Home 2 — 3D + steps",
  description:
    "Home variation 2: 3D machine hero, sticky 4-step story, then the full OranGo homepage.",
  alternates: { canonical: "https://orango.co.in/home2" },
  robots: { index: false, follow: true },
};

export default function Home2Page() {
  return (
    <>
      <MachineHero />
      <Hero3 anchorId="home-steps-hero" steps={HOME2_STEPS} />
      <HomePageRest />
    </>
  );
}
