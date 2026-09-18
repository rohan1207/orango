import LandingIntro from "@/components/LandingIntro";

export const metadata = {
  title: "Welcome | Orango",
  description:
    "Orango — fresh orange juice, freshly squeezed. Watch the intro, then explore the site.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://orango.co.in/" },
};

export default function LandingPage() {
  return (
    <>
      <link
        rel="preload"
        href="/orange_machine.glb"
        as="fetch"
        crossOrigin="anonymous"
      />
      <LandingIntro />
    </>
  );
}
