export const brand = {
  name: "OranGo",
  legalName: "INNOVERTEX LLP",
  tagline: "Fresh juice. Automated.",
  url: "https://orango.co.in",
  email: "hello@orango.co.in",
  partnershipsEmail: "partnerships@orango.co.in",
  supportEmail: "support@orango.co.in",
  phone: "+91 95990 38388",
  phoneTel: "+919599038388",
  phoneHref: "tel:+919599038388",
  whatsapp: "https://wa.me/919599038388",
  address: "Hauz Khas Enclave, New Delhi 110016",
  addressFull: "Hauz Khas Enclave, New Delhi, Delhi 110016, India",
  city: "New Delhi",
  region: "Delhi NCR",
  gstin: "Available on request",
  fssai: "Available on request",
  linkedin: "https://www.linkedin.com/company/orango",
  instagram: "https://www.instagram.com/orango.in/",
  priceFrom: "₹120",
  squeezeTime: "45 seconds",
  storageTemp: "4°C",
  orangeType: "100% Valencia oranges",
};

export const primaryCta = {
  label: "Book a site survey",
  href: "/contact?intent=survey",
};

export const secondaryCta = {
  label: "Find a machine",
  href: "/find-orango",
};

export const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/the-machine", label: "The Machine" },
  { href: "/for-locations", label: "For Locations" },
  { href: "/partners", label: "Partners" },
  { href: "/find-orango", label: "Find OranGo" },
  { href: "/about", label: "About" },
];

export const footerQuickLinks = [
  { href: "/home", label: "Home" },
  { href: "/the-machine", label: "The Machine" },
  { href: "/for-locations", label: "For Locations" },
  { href: "/partners", label: "Partners" },
  { href: "/find-orango", label: "Find OranGo" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

export const footerLegal = [
  { href: "/career", label: "Careers" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund Policy" },
];

export const venueTypes = [
  {
    id: "hospital",
    title: "Hospitals",
    problem: "Visitors and staff need a clean, credible beverage — not sugary packaged juice.",
    fit: "Sealed cup, ozone-cleaned path, no hand contact. Ideal for lobbies and outpatient areas.",
    bullets: [
      "Hygienic sealed cup — untouched by hand",
      "Clear nutrition story for health-conscious visitors",
      "Low footprint (~12 sq. ft.) with a single power point",
    ],
    image: "/hospital.png",
  },
  {
    id: "office",
    title: "Offices",
    problem: "Cafeteria sugar spikes. Teams want something fresh without a juice bar build-out.",
    fit: "Self-serve Valencia orange juice in under a minute — UPI, no attendant needed.",
    bullets: [
      "UPI-native, no cash handling for facilities",
      "OranGo restocks and cleans on a schedule",
      "Fits pantry corridors and lobby lounges",
    ],
    image: "/office.png",
  },
  {
    id: "mall",
    title: "Malls",
    problem: "Food courts sell sugar. Shoppers want a healthier impulse buy between stores.",
    fit: "A living product moment: watch oranges squeeze, take a sealed cup, keep walking.",
    bullets: [
      "High visibility, high throughput locations",
      "From ₹120 — clear price, no menu negotiation",
      "Ozone + cold storage keep every cup consistent",
    ],
    image: "/mall.png",
  },
  {
    id: "gym",
    title: "Gyms",
    problem: "Members want post-workout hydration that is not a canned soft drink.",
    fit: "Potassium-rich, no sugar added — placed near reception or recovery zones.",
    bullets: [
      "Natural Vitamin C and electrolytes from whole fruit",
      "Fast cycle — 45 seconds from pay to pour",
      "We handle fruit, cups, and cleaning",
    ],
    image: "/gym.png",
  },
  {
    id: "campus",
    title: "Campuses",
    problem: "Students default to packaged sugar. Institutions want healthier options on site.",
    fit: "Automated, transparent juicing that scales across hostels and academic blocks.",
    bullets: [
      "Transparent process builds trust with Gen Z",
      "Multi-machine rollout for large campuses",
      "Simple commercial model — you provide bay + power",
    ],
    image: "/office.png",
  },
  {
    id: "transit",
    title: "Transit",
    problem: "Airports and metro hubs need fast, hygienic F&B that does not need a full kitchen.",
    fit: "Compact automated unit with sealed cups for travellers on the move.",
    bullets: [
      "Quick serve for high footfall corridors",
      "Sealed cup travels well",
      "Remote monitoring ready for multi-site ops",
    ],
    image: "/mall.png",
  },
];

export const machineSpecs = [
  { label: "Footprint", value: "~12 sq. ft." },
  { label: "Fruit load", value: "Up to ~70 kg Valencia oranges" },
  { label: "Cup size", value: "250 ml sealed cup" },
  { label: "Cycle time", value: "About 45 seconds" },
  { label: "Storage", value: "Fruit held at 4°C" },
  { label: "Payment", value: "UPI (and card-ready hardware)" },
  { label: "Hygiene", value: "Ozone sterilisation of fruit path" },
  { label: "Power", value: "Standard single-phase outlet" },
  { label: "Price from", value: "₹120 per cup" },
  { label: "Operations", value: "OranGo installs, restocks & cleans" },
];

export const partnerModels = [
  {
    title: "Location partnership",
    bestFor: "Malls, hospitals, offices, gyms, campuses",
    youProvide: "Bay (~12 sq. ft.), power point, loading access",
    weProvide: "Machine, install, fruit, cups, cleaning, uptime",
    nextStep: "Book a site survey — we assess footfall and power",
  },
  {
    title: "Franchise / operator",
    bestFor: "Operators who want multi-site routes in a city",
    youProvide: "Local ops capacity and venue relationships",
    weProvide: "Machines, brand, supply chain, playbooks",
    nextStep: "Qualified partner form — city, role, capacity",
  },
  {
    title: "Strategic / investment",
    bestFor: "Groups exploring category or territory platforms",
    youProvide: "Capital and long-term partnership intent",
    weProvide: "Unit economics discussion under NDA",
    nextStep: "Email partnerships@orango.co.in",
  },
];

export const partnerTimeline = [
  { step: "01", title: "Enquiry", body: "Tell us venue type, city, and role." },
  { step: "02", title: "Site survey", body: "We visit, measure bay, check power and access." },
  { step: "03", title: "Agreement", body: "Commercial terms for location or operator model." },
  { step: "04", title: "Install", body: "Delivery, setup, staff walkthrough." },
  { step: "05", title: "Go-live", body: "First cups sold. Restock and clean schedule begins." },
];

export const findLocations = [
  {
    name: "Delhi NCR — live & expanding",
    area: "New Delhi / NCR",
    note: "Machines are live in Delhi NCR. Exact public locator pins publish as sites open. WhatsApp us for the nearest cup today.",
    status: "Live",
  },
];

export const faqs = [
  {
    q: "Is the juice 100% pure?",
    a: "Yes. Every cup is 100% Valencia orange juice — no sugar, no water, no preservatives. Oranges are squeezed to order in front of you.",
  },
  {
    q: "How long does it take?",
    a: "About 45 seconds from payment to sealed cup. Tap UPI, watch it squeeze, take your drink.",
  },
  {
    q: "How much does a cup cost?",
    a: "Cups start from ₹120. Exact pricing may vary by location.",
  },
  {
    q: "What cup size do you serve?",
    a: "Standard serve is a 250 ml sealed cup — hygienic and ready to go.",
  },
  {
    q: "How do I pay?",
    a: "UPI is live on every machine. Hardware is card-ready for partner sites that need it.",
  },
  {
    q: "What if payment succeeds but the vend fails?",
    a: "Follow the refund policy: share UTR, Machine ID, and a photo via support@orango.co.in. We resolve failed vends promptly.",
  },
  {
    q: "Where can I find a machine?",
    a: "OranGo is live in Delhi NCR and expanding. See Find OranGo or WhatsApp us for the nearest site.",
  },
  {
    q: "Can I place a machine at my venue?",
    a: "Yes — that is our core business. Book a site survey. You provide bay and power; we install, restock, and clean.",
  },
  {
    q: "Do you offer franchise?",
    a: "Yes. Location partnerships, franchise/operator routes, and strategic discussions — see Partners.",
  },
  {
    q: "Who restocks and cleans?",
    a: "OranGo (INNOVERTEX LLP). Venue teams do not handle fruit or sanitation day-to-day.",
  },
];

export const trustPoints = [
  "100% Valencia oranges",
  "No sugar · No preservatives",
  "UPI payments",
  "Ozone sterilised path",
  "Sealed cup · untouched by hand",
  "Stored at 4°C",
  "From ₹120 · ~45 seconds",
  "Built for Indian high-footfall sites",
];

export const careers = [
  {
    title: "City launch lead",
    type: "Full-time · Delhi NCR",
    copy: "Open venues, run surveys, and take machines from agreement to first cup sold.",
  },
  {
    title: "Partnerships associate",
    type: "Full-time · Delhi",
    copy: "Talk to malls, hospitals, offices, and gyms. Qualify leads and book site surveys.",
  },
  {
    title: "Field operations",
    type: "Full-time · Delhi NCR",
    copy: "Restock, clean, and keep machines live. Fruit quality and uptime are the job.",
  },
];
