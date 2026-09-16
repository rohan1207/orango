import OrangeSliceDecor from "./OrangeSliceDecor";

export default function PageHero({ eyebrow, title, lede }) {
  return (
    <section className="relative overflow-hidden border-b border-black/6 bg-white pt-[calc(var(--nav-h)+3.5rem)] pb-14 md:pb-20">
      <OrangeSliceDecor
        className="right-[-6%] top-[24%] h-44 w-44 md:h-52 md:w-52"
        opacity={0.18}
        rotate={18}
      />
      <OrangeSliceDecor
        className="bottom-[-8%] left-[-4%] h-40 w-40 md:h-48 md:w-48"
        opacity={0.16}
        rotate={-12}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        {eyebrow ? (
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-4xl text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#8B3410]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#8B3410]/65 md:text-[17px]">
            {lede}
          </p>
        ) : null}
      </div>
    </section>
  );
}
