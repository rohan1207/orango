import Image from "next/image";
import Logo from "./Logo";

export default function MobileGate() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#FFFAF6] px-8 text-center md:hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 h-48 w-48 opacity-20"
      >
        <Image
          src="/orange-bg.png"
          alt=""
          fill
          className="object-contain"
          sizes="200px"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-14 h-52 w-52 opacity-15"
      >
        <Image
          src="/orange-bg.png"
          alt=""
          fill
          className="object-contain"
          sizes="220px"
        />
      </div>

      <div className="relative z-10 flex max-w-sm flex-col items-center">
        <Logo />
        <h1 className="mt-10 text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-[#8B3410]">
          Phone experience is in progress
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#8B3410]/70">
          Please visit us on desktop for the full Orango experience.
        </p>
        <div className="mt-8 rounded-full bg-[#EE6F28] px-5 py-2.5 text-[13px] font-semibold text-white">
          Desktop only · for now
        </div>
      </div>
    </div>
  );
}
