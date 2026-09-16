import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact Us | Place a Machine or Partner with Orango",
  description:
    "Contact Orango for machine placement, franchise operations, or strategic partnerships. Delhi HQ. Phone +91 9599038388. Email partnerships@orango.co.in.",
  keywords: [
    "contact Orango",
    "orange juice machine placement",
    "juice vending partnership India",
    "Orango Delhi",
    "fresh juice franchise contact",
  ],
  alternates: { canonical: "https://orango.co.in/contact" },
  openGraph: {
    title: "Contact Orango — site placement & partnerships",
    description:
      "Tell us about your floor. We map placement fit, commercial options, and next steps for fresh juice machines in India.",
    url: "https://orango.co.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
