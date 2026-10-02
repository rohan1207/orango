import New3dScrollHero from "@/components/New3dScrollHero";
import HomePageRest from "@/components/HomePageRest";

export const metadata = {
  title: "OranGo | Home 4 — Scroll frames",
  description:
    "Home variation 4: scroll-scrubbed frame hero (home4 frames) + full OranGo homepage.",
  alternates: { canonical: "https://orango.co.in/home4" },
  robots: { index: false, follow: true },
};

export default function Home4Page() {
  return (
    <>
      <New3dScrollHero frameSet="home4" waitForAllFrames />
      <HomePageRest />
    </>
  );
}
