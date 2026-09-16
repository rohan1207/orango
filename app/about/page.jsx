import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About Us | Fresh orange juice for everyday public spaces",
  description:
    "OranGo brings freshly squeezed Valencia orange juice to hospitals, offices, malls, and gyms across India — pure, hygienic, and as convenient as the drinks already in public space.",
  keywords: [
    "Orango about",
    "OranGo company",
    "fresh orange juice India",
    "healthy beverage public spaces",
    "orange juice vending network",
  ],
  alternates: { canonical: "https://orango.co.in/about" },
  openGraph: {
    title: "About Orango — fresh juice closer to everyday life",
    description:
      "We make pure orange juice as effortless as caffeinated and sugary drinks in India's high-footfall spaces.",
    url: "https://orango.co.in/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
