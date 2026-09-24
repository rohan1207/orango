import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Book a Site Survey | Contact OranGo",
  description:
    "Request an OranGo site survey for your mall, hospital, office or gym. INNOVERTEX LLP · Delhi. Phone +91 95990 38388 · partnerships@orango.co.in · WhatsApp.",
  keywords: [
    "OranGo site survey",
    "contact OranGo",
    "juice machine placement India",
    "INNOVERTEX LLP contact",
  ],
  alternates: { canonical: "https://orango.co.in/contact" },
  openGraph: {
    title: "Book an OranGo site survey",
    description:
      "Venue type, city, and role — we assess bay, power, and loading access.",
    url: "https://orango.co.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
