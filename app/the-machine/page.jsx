import MachineContent from "@/components/MachineContent";

export const metadata = {
  title: "The Machine | Specs, hygiene & 45-second juice journey",
  description:
    "OranGo automated orange juice vending machine: ~12 sq. ft., Valencia oranges at 4°C, UPI, ozone cleaning, sealed 250 ml cup from ₹120 in about 45 seconds. Specs for malls, hospitals, offices and gyms in India.",
  keywords: [
    "orange juice vending machine specs India",
    "Valencia orange juice machine",
    "UPI juice vending machine",
    "OranGo machine",
  ],
  alternates: { canonical: "https://orango.co.in/the-machine" },
  openGraph: {
    title: "OranGo The Machine — fresh orange juice in 45 seconds",
    description:
      "Footprint, capacity, hygiene, payments, and the squeeze-to-seal journey. Built for Indian high-footfall venues.",
    url: "https://orango.co.in/the-machine",
    type: "website",
  },
};

export default function TheMachinePage() {
  return <MachineContent />;
}
