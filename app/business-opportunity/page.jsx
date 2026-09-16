import BusinessOpportunityContent from "@/components/BusinessOpportunityContent";

export const metadata = {
  title: "Business Opportunity | Host, Operate & Scale Orango",
  description:
    "Partner with Orango to host or operate fresh orange juice machines across Indian malls, hospitals, offices, and campuses. Low labour, high-trust SKU, early-stage India rollout.",
  keywords: [
    "orange juice franchise India",
    "juice vending business opportunity",
    "healthy beverage partnership",
    "mall F&B amenity",
    "Orango partner",
    "juice machine franchise",
  ],
  alternates: { canonical: "https://orango.co.in/business-opportunity" },
  openGraph: {
    title: "Orango Business Opportunity — turn footfall into fresh juice",
    description:
      "Host a machine, operate a cluster, or discuss strategic multi-city rollout. Built for high-footfall floors in India.",
    url: "https://orango.co.in/business-opportunity",
    type: "website",
  },
};

export default function BusinessPage() {
  return <BusinessOpportunityContent />;
}
