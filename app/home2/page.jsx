import MachineHero from "@/components/MachineHero";
import Hero3, { HOME2_STEPS } from "@/components/Hero3";
import HomePageRest from "@/components/HomePageRest";

/** Archived preview — live homepage is `/` (Home 4). */
export const metadata = {
  title: "OranGo | Home 2 (archive)",
  description: "Archived home variation 2. Live site uses Home 4 at /.",
  alternates: { canonical: "https://orango.co.in/" },
  robots: { index: false, follow: false },
};

export default function Home2ArchivePage() {
  return (
    <>
      <MachineHero />
      <Hero3 anchorId="home-steps-hero" steps={HOME2_STEPS} />
      <HomePageRest />
    </>
  );
}
