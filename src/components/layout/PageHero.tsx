import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  actions,
  className,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        "hero-viewport relative isolate overflow-hidden bg-[var(--bg-ink)] text-[var(--on-ink)]",
        className
      )}
    >
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(42,14,22,0.58)_0%,rgba(42,14,22,0.32)_50%,rgba(224,18,54,0.2)_100%)]" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[var(--bg-ink)]" />
      )}

      <div className="container-site relative flex h-full min-h-0 flex-col justify-end px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 md:px-8 md:pb-12">
        {eyebrow ? (
          <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-hot)] sm:mb-3 sm:text-[0.72rem] sm:tracking-[0.28em]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="display reveal-up max-w-4xl text-[clamp(2rem,8svh,5rem)] text-[var(--on-ink)]">
          {title}
        </h1>
        <div className="page-rule mt-3 sm:mt-4" />
        <p className="reveal-up mt-3 max-w-2xl text-sm font-light leading-relaxed text-[var(--on-ink-soft)] sm:mt-4 sm:text-base [animation-delay:80ms]">
          {description}
        </p>
        {actions ? (
          <div className="reveal-up mt-5 flex w-full flex-col gap-2.5 [animation-delay:140ms] sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3 [&>a]:w-full sm:[&>a]:w-auto">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function PageCta({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn("btn", variant === "primary" ? "btn-on-dark" : "btn-on-dark-outline")}
    >
      {children}
    </Link>
  );
}
