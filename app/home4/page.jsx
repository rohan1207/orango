import New3dScrollHero from "@/components/New3dScrollHero";
import HomePageRest from "@/components/HomePageRest";

/** Archived preview — live homepage is `/` (same Home 4 experience). */
export const metadata = {
  title: "OranGo | Home 4 (archive)",
  description: "Archived home variation 4. Live site uses this experience at /.",
  alternates: { canonical: "https://orango.co.in/" },
  robots: { index: false, follow: false },
};

export default function Home4ArchivePage() {
  return (
    <>
      <New3dScrollHero frameSet="home4" waitForAllFrames />
      <HomePageRest />
    </>
  );
}
