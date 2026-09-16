"use client";

export default function Preloader({ progress = 0, ready = false }) {
  const pct = Math.min(100, Math.round(progress * 100));

  return (
    <div
      className={`fixed inset-0 z-[80] grid place-items-center bg-paper transition-opacity duration-700 ease-out ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={ready}
      role="status"
    >
      <div className="flex w-[min(88vw,360px)] flex-col items-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
          Orango
        </p>
        <div className="relative mt-6 h-px w-full bg-ink/10">
          <div
            className="absolute inset-y-0 left-0 bg-orange transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-4 flex w-full items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>Loading juice sequence</span>
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}
