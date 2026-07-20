import { siteConfig } from "@/data/site";

type StudioMapProps = {
  className?: string;
  minHeightClassName?: string;
};

export function StudioMap({
  className = "",
  minHeightClassName = "min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]",
}: StudioMapProps) {
  return (
    <div className={`relative overflow-hidden ${minHeightClassName} ${className}`}>
      <iframe
        title="AVX Fitness location map"
        src={siteConfig.googleMapsEmbedUrl}
        className="absolute inset-0 h-full w-full border-0 grayscale-[0.12] contrast-[1.04] saturate-[1.08]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--bg)]/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg)]/50 to-transparent"
        aria-hidden
      />
      <div className="absolute bottom-4 left-4 bg-[var(--bg)]/90 px-3.5 py-2.5 backdrop-blur-md sm:bottom-5 sm:left-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          Studio pin
        </p>
        <p className="mt-0.5 text-sm font-medium text-[var(--text)]">
          {siteConfig.city}, {siteConfig.state}
        </p>
      </div>
    </div>
  );
}
