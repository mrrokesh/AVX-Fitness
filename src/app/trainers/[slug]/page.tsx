import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrainer, trainers } from "@/data/trainers";
import { siteConfig } from "@/data/site";
import { primaryChatUrl, telUrl } from "@/lib/utils";

export function generateStaticParams() {
  return trainers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) return { title: "Trainer" };
  return {
    title: `${trainer.name} — Personal Trainer in ${siteConfig.city}`,
    description: trainer.bio,
  };
}

export default async function TrainerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) notFound();

  return (
    <div className="section-pad container-site">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-[#15171c]">
          <Image
            src={trainer.photo}
            alt={`${trainer.name}, ${trainer.role}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <h1 className="display text-5xl text-[var(--text)] sm:text-6xl">{trainer.name}</h1>
          <p className="mt-2 text-[var(--accent)]">{trainer.role}</p>
          <p className="mt-4 text-[var(--text-muted)]">{trainer.bio}</p>
          <dl className="mt-6 space-y-3 text-sm">
            <Row term="Certifications" detail={trainer.certifications.join(", ")} />
            <Row term="Specializations" detail={trainer.specializations.join(", ")} />
            <Row
              term="Experience"
              detail={
                trainer.yearsExperience > 0
                  ? `${trainer.yearsExperience} years`
                  : "Ask coach for experience details"
              }
            />
            <Row term="Training modes" detail={trainer.modes.join(", ")} />
            <Row term="Availability" detail={trainer.availability} />
            {trainer.phone && <Row term="WhatsApp / Call" detail={trainer.phone} />}
            {trainer.instagram && <Row term="Instagram" detail={trainer.instagram} />}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={primaryChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              WhatsApp Kathir
            </a>
            {trainer.phone && (
              <a href={telUrl(trainer.phone)} className="btn btn-secondary">
                Call now
              </a>
            )}
            <Link
              href={`/consultation?trainer=${trainer.slug}`}
              className="btn btn-ghost"
            >
              Book consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-2 border-b border-[var(--border)] py-2">
      <dt className="text-[var(--text-muted)]">{term}</dt>
      <dd className="text-[var(--text)]">{detail}</dd>
    </div>
  );
}
