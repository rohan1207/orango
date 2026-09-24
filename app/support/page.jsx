import SupportContent from "@/components/SupportContent";

export const metadata = {
  title: "Support | Failed vend, refunds & machine help",
  description:
    "OranGo support for failed vends: share UTR, Machine ID and a photo. Email support@orango.co.in. Matches our refund policy. Phone and WhatsApp available.",
  keywords: ["OranGo support", "juice machine refund", "failed vend UPI"],
  alternates: { canonical: "https://orango.co.in/support" },
  openGraph: {
    title: "OranGo Support — failed vend help",
    description:
      "UTR + Machine ID + photo. We resolve failed payments promptly.",
    url: "https://orango.co.in/support",
    type: "website",
  },
};

export default function SupportPage() {
  return <SupportContent />;
}
