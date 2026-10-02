// import New3dScrollHero from "@/components/New3dScrollHero"; // see /home1 & /home3
import Hero3 from "@/components/Hero3";
// import MachineHero from "@/components/MachineHero"; // see /home2
import HomePageRest from "@/components/HomePageRest";

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
    images: [{ url: "/machine_orange.png", alt: "OranGo vending machine" }],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Default /home keeps the 5-step locked hero. Variants: /home1 /home2 /home3 */}
      <Hero3 />
      <HomePageRest />
    </>
  );
}
