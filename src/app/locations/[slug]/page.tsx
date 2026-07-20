import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const pages = [
  {
    slug: "personal-trainer",
    title: `Personal Trainer in ${siteConfig.city}`,
    body: `Work 1:1 with certified coaches at ${siteConfig.name}. Book a free consultation to match your goals.`,
  },
  {
    slug: "best-gym",
    title: `Best Gym in ${siteConfig.city}`,
    body: `Strength floor, coaching systems and community training at ${siteConfig.name}.`,
  },
  {
    slug: "weight-loss-coaching",
    title: `Weight Loss Coaching in ${siteConfig.city}`,
    body: `Sustainable fat-loss training and nutrition guidance — no unrealistic promises.`,
  },
  {
    slug: "muscle-building-program",
    title: `Muscle Building Program in ${siteConfig.city}`,
    body: `Hypertrophy-focused programming with progressive overload and recovery planning.`,
  },
  {
    slug: "online-fitness-coaching",
    title: "Online Fitness Coaching",
    body: "Remote programming, form review and accountability wherever you train.",
  },
  {
    slug: "womens-fitness-program",
    title: "Women’s Fitness Program",
    body: "Strength-first coaching in a supportive environment for every experience level.",
  },
  {
    slug: "beginner-gym-program",
    title: "Beginner Gym Program",
    body: "Technique-first onboarding for first-time gym members.",
  },
];

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  return {
    title: page?.title ?? "Local fitness",
    description: page?.body,
  };
}

export default async function LocationSeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) {
    return (
      <div className="section-pad container-site">
        <h1 className="display text-4xl text-[var(--text)]">Page not found</h1>
      </div>
    );
  }

  return (
    <div className="section-pad container-site max-w-3xl">
      <h1 className="display text-5xl text-[var(--text)] sm:text-6xl">{page.title}</h1>
      <p className="mt-4 text-lg text-[var(--text-muted)]">{page.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/consultation" className="btn btn-primary">
          Book consultation
        </Link>
        <Link href="/#waitlist-form" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}
