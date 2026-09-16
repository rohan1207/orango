import LandingIntro from "@/components/LandingIntro";

export const metadata = {
  title: "Welcome",
  robots: { index: false, follow: false },
};

export default function IntroPage() {
  return <LandingIntro />;
}
