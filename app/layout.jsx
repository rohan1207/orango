import { Inter } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import { brand, faqs } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://orango.co.in"),
  title: {
    default: "OranGo | Fresh Orange Juice Vending Machines in India",
    template: "%s | OranGo",
  },
  description:
    "Automated machines that squeeze Valencia oranges in 45 seconds. No sugar, no preservatives, UPI. Place OranGo in malls, hospitals, offices and gyms. Operated by INNOVERTEX LLP.",
  keywords: [
    "OranGo",
    "orange juice vending machine India",
    "fresh orange juice vending",
    "Valencia orange juice machine",
    "UPI juice vending machine",
    "juice machine for malls hospitals offices",
    "INNOVERTEX LLP",
    "site survey juice machine",
  ],
  authors: [{ name: "INNOVERTEX LLP" }],
  creator: "INNOVERTEX LLP",
  publisher: "INNOVERTEX LLP",
  openGraph: {
    title: "OranGo | Fresh Orange Juice Vending Machines in India",
    description:
      "Automated machines that squeeze Valencia oranges in 45 seconds. No sugar, no preservatives, UPI. Place OranGo in malls, hospitals, offices and gyms.",
    url: "https://orango.co.in",
    siteName: "OranGo",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/machine.png",
        width: 1200,
        height: 630,
        alt: "OranGo fresh orange juice vending machine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OranGo | Fresh Orange Juice Vending Machines in India",
    description:
      "Automated Valencia orange juice machines for Indian malls, hospitals, offices and gyms. From ₹120 · ~45 seconds · UPI.",
    images: ["/machine.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://orango.co.in",
    languages: { "en-IN": "https://orango.co.in" },
  },
  category: "business",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OranGo",
  legalName: brand.legalName,
  url: brand.url,
  logo: `${brand.url}/logo.png`,
  email: brand.email,
  telephone: brand.phoneTel,
  sameAs: [brand.linkedin, brand.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hauz Khas Enclave",
    addressLocality: "New Delhi",
    postalCode: "110016",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: brand.partnershipsEmail,
      telephone: brand.phoneTel,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: brand.supportEmail,
      telephone: brand.phoneTel,
      areaServed: "IN",
    },
  ],
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "OranGo",
  image: `${brand.url}/machine.png`,
  url: brand.url,
  telephone: brand.phoneTel,
  email: brand.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hauz Khas Enclave",
    addressLocality: "New Delhi",
    postalCode: "110016",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Delhi NCR",
  },
  priceRange: "₹₹",
};

const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OranGo Fresh Orange Juice Vending Machine",
  description:
    "Automated vending machine that squeezes Valencia oranges to order in about 45 seconds. UPI payments, ozone cleaning, sealed cup, fruit stored at 4°C. From ₹120.",
  brand: { "@type": "Brand", name: "OranGo" },
  image: `${brand.url}/machine.png`,
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: "120",
    availability: "https://schema.org/InStock",
    url: `${brand.url}/the-machine`,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OranGo",
  url: brand.url,
  publisher: { "@type": "Organization", name: brand.legalName },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: `${brand.url}/find-orango`,
    "query-input": "required name=search_term_string",
  },
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
