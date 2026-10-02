import New3dScrollHero from "@/components/New3dScrollHero";
import HomePageRest from "@/components/HomePageRest";

export const metadata = {
  title: "OranGo | Home 3 — Scroll frames",
  description:
    "Home variation 3: scroll-scrubbed frame hero (home3 frames) + full OranGo homepage.",
  alternates: { canonical: "https://orango.co.in/home3" },
  robots: { index: false, follow: true },
};

export default function Home3Page() {
  return (
    <>
      <New3dScrollHero frameSet="home3" waitForAllFrames />
      <HomePageRest />
    </>
  );
}
