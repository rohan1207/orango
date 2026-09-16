import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "", invert = false }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Orango home"
    >
      <Image
        src="/logo.png"
        alt="Orango"
        width={180}
        height={52}
        priority
        className={`h-10 w-auto object-contain md:h-11 lg:h-12 ${
          invert ? "brightness-0 invert" : ""
        }`}
      />
    </Link>
  );
}
