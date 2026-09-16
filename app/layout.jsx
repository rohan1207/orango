import { Inter } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import CustomCursor from "@/components/CustomCursor";
import { brand } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://orango.co.in"),
  title: {
    default: "Orango | Fresh orange juice vending for high-footfall India",
    template: "%s | Orango",
  },
  description:
    "Orango deploys automated Valencia orange juice machines for malls, offices, hospitals, gyms, and campuses. Squeezed to order in under a minute. UPI. Hygienic. Built for B2B partners across India.",
  keywords: [
    "orange juice vending machine",
    "fresh juice franchise India",
    "Valencia orange juice",
    "UPI vending machine",
    "healthy beverage for malls",
    "Orango",
    "OranGo",
  ],
  openGraph: {
    title: "Orango — fresh juice infrastructure for public spaces",
    description:
      "Place a hygienic, UPI-native orange juice machine where people already spend time. Partnerships, franchise, and multi-site rollouts.",
    url: "https://orango.co.in",
    siteName: "Orango",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orango | Fresh orange juice, commercially placed",
    description:
      "Automated juice machines for Indian malls, campuses, hospitals, and workplaces.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://orango.co.in" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: brand.url,
  email: brand.email,
  telephone: brand.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hauz Khas Enclave",
    addressLocality: "New Delhi",
    postalCode: "110016",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: brand.partnershipsEmail,
      contactType: "sales",
      telephone: brand.phone,
      areaServed: "IN",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${inter.className} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <CustomCursor />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
