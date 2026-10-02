import New3dScrollHero from "@/components/New3dScrollHero";
import HomePageRest from "@/components/HomePageRest";

/** Archived preview — live homepage is `/` (Home 4). */
export const metadata = {
  title: "OranGo | Home 3 (archive)",
  description: "Archived home variation 3. Live site uses Home 4 at /.",
  alternates: { canonical: "https://orango.co.in/" },
  robots: { index: false, follow: false },
};

export default function Home3ArchivePage() {
  return (
    <>
      <New3dScrollHero frameSet="home3" waitForAllFrames />
      <HomePageRest />
    </>
  );
}
