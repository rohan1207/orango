import PartnersContent from "@/components/PartnersContent";

export const metadata = {
  title: "Partners | Location, franchise & strategic partnerships",
  description:
    "Partner with OranGo (INNOVERTEX LLP): location partnerships, franchise/operator routes, or strategic investment. Enquiry → survey → agreement → install → go-live.",
  keywords: [
    "orange juice vending franchise India",
    "juice machine location partnership",
    "OranGo partners",
    "INNOVERTEX LLP",
  ],
  alternates: { canonical: "https://orango.co.in/partners" },
  openGraph: {
    title: "OranGo Partners — location, franchise, strategic",
    description:
      "Plain-language partner models and a five-step path from enquiry to go-live.",
    url: "https://orango.co.in/partners",
    type: "website",
  },
};

export default function PartnersPage() {
  return <PartnersContent />;
}
