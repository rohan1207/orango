import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] flex-col items-center justify-center px-5 pt-[var(--nav-h)] text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-orange">
        404
      </p>
      <h1 className="font-display mt-4 max-w-xl text-4xl tracking-tight md:text-6xl">
        This floor doesn&apos;t have a machine yet.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page is missing. Start from home, find a live machine, or book a
        site survey for your venue.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <MagneticButton href="/home">Home</MagneticButton>
        <MagneticButton href="/find-orango" variant="ghost">
          Find OranGo
        </MagneticButton>
        <MagneticButton href="/contact?intent=survey" variant="ghost">
          Book a site survey
        </MagneticButton>
      </div>
    </section>
  );
}
