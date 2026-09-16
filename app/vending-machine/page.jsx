import VendingMachineContent from "@/components/VendingMachineContent";

export const metadata = {
  title: "Smart Orange Juice Vending Machine | Orango",
  description:
    "Orango smart juice machines store Valencia oranges at 4°C, accept UPI, self-clean, sterilise with ozone, and seal every cup in ~45 seconds. Built for malls, hospitals, offices, and gyms across India.",
  keywords: [
    "orange juice vending machine India",
    "fresh juice machine",
    "UPI juice vending",
    "automated orange juicer",
    "healthy beverage machine",
    "Orango machine",
  ],
  alternates: { canonical: "https://orango.co.in/vending-machine" },
  openGraph: {
    title: "Orango Vending Machine — fresh juice, squeezed to order",
    description:
      "Chilled Valencia oranges, UPI pay, ozone hygiene, and a sealed cup — engineered for high-footfall public spaces.",
    url: "https://orango.co.in/vending-machine",
    type: "website",
  },
};

export default function VendingPage() {
  return <VendingMachineContent />;
}
