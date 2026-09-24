import FindOrangoContent from "@/components/FindOrangoContent";

export const metadata = {
  title: "Find OranGo | Live machines in Delhi NCR",
  description:
    "Find OranGo fresh orange juice vending machines in Delhi NCR. From ₹120, ~45 seconds, UPI. WhatsApp for the nearest machine. Expanding across India.",
  keywords: [
    "OranGo near me",
    "orange juice vending Delhi",
    "fresh juice machine Delhi NCR",
  ],
  alternates: { canonical: "https://orango.co.in/find-orango" },
  openGraph: {
    title: "Find OranGo — Delhi NCR live",
    description:
      "Live in Delhi NCR. WhatsApp for the nearest cup. Public locator expands as sites open.",
    url: "https://orango.co.in/find-orango",
    type: "website",
  },
};

export default function FindOrangoPage() {
  return <FindOrangoContent />;
}
