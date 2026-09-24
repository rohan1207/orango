import LocationsContent from "@/components/LocationsContent";

export const metadata = {
  title: "For Locations | Hospitals, malls, offices, gyms & campuses",
  description:
    "Request an OranGo site survey. Place automated Valencia orange juice machines in hospitals, malls, offices, gyms, campuses and transit. You provide ~12 sq. ft. and power — we install, restock and clean.",
  keywords: [
    "juice vending machine for malls India",
    "hospital beverage vending",
    "office healthy drink machine",
    "OranGo site survey",
  ],
  alternates: { canonical: "https://orango.co.in/for-locations" },
  openGraph: {
    title: "OranGo for Locations — book a site survey",
    description:
      "Venue-by-venue pitches for hospitals, offices, malls, gyms and campuses. What we need from you: bay, power, loading access.",
    url: "https://orango.co.in/for-locations",
    type: "website",
  },
};

export default function ForLocationsPage() {
  return <LocationsContent />;
}
