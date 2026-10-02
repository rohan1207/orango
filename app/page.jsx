import RootHome from "@/components/RootHome";

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
  robots: { index: true, follow: true },
  alternates: { canonical: "https://orango.co.in/" },
  openGraph: {
    title: "OranGo | Fresh Orange Juice Vending Machines in India",
    description:
      "100% Valencia oranges. ~45 seconds. UPI. Sealed cup. Built for malls, hospitals, offices and gyms.",
    url: "https://orango.co.in/",
    type: "website",
    images: [{ url: "/machine_orange.png", alt: "OranGo vending machine" }],
  },
};

export default function HomePage() {
  return <RootHome />;
}
