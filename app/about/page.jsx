import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About OranGo | INNOVERTEX LLP",
  description:
    "OranGo by INNOVERTEX LLP places automated Valencia orange juice vending machines across Indian malls, hospitals, offices and gyms. Fresh juice. Automated. Sealed cup — not bottled D2C.",
  keywords: [
    "About OranGo",
    "INNOVERTEX LLP",
    "orange juice vending India",
  ],
  alternates: { canonical: "https://orango.co.in/about" },
  openGraph: {
    title: "About OranGo — INNOVERTEX LLP",
    description:
      "A location-based automated beverage network — not a juice café.",
    url: "https://orango.co.in/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
