import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "", invert = false }) {
  return (
    <Link
      href="/home"
      className={`inline-flex items-center ${className}`}
      aria-label="OranGo home"
    >
      <Image
        src="/logo.png"
        alt="OranGo"
        width={180}
        height={52}
        priority
        className={`h-8 w-auto object-contain sm:h-10 md:h-11 lg:h-12 ${
          invert ? "brightness-0 invert" : ""
        }`}
      />
    </Link>
  );
}
