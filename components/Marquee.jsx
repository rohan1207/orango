export default function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-[12px] font-semibold uppercase tracking-[0.28em] text-muted"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}
