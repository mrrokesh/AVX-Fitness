import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrainerProfileCard } from "@/components/trainers/TrainerProfileCard";
import { CoachCertList } from "@/components/trainers/CoachCertList";
import { ContactIconBadge } from "@/components/icons/ContactIconBadge";
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
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
        <div className="flex flex-col items-center gap-5 lg:items-stretch">
          <TrainerProfileCard
            name={trainer.name}
            title="Certified Fitness Trainer"
            handle="Kathir"
            status="Certified Fitness Trainer"
            photo={trainer.photo}
          />

          <CoachCertList certifications={trainer.certifications} />
        </div>

        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-[var(--accent)] px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white">
            Your Coach
          </p>
          <h1 className="display mt-4 text-[clamp(2.6rem,5vw,4rem)] text-[var(--text)]">
            {trainer.name}
          </h1>
          <p className="mt-2 text-base font-medium text-[var(--text-muted)] sm:text-lg">
            Founder, {siteConfig.name} · Tamil Nadu Fitness Coach · Fat Loss &amp;
            Transformation Coach
          </p>

          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-[var(--text-muted)]">
            <p>{trainer.bio}</p>
            <p>
              Training modes:{" "}
              <strong className="font-semibold text-[var(--text)]">
                {trainer.modes.join(" · ")}
              </strong>
              . Specializations include{" "}
              {trainer.specializations.slice(0, 4).join(", ").toLowerCase()}, and
              more.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Follow along
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {trainer.instagramUrl && (
                <a
                  href={trainer.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  <ContactIconBadge kind="instagram" size="sm" />
                  {trainer.instagram || "@kathir_lifts"}
                </a>
              )}
              <a
                href={primaryChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                <ContactIconBadge kind="whatsapp" size="sm" />
                WhatsApp
              </a>
            </div>
          </div>

          <dl className="mt-8 space-y-3 text-sm">
            <Row term="Availability" detail={trainer.availability} />
            {trainer.phone && (
              <Row term="WhatsApp / Call" detail={trainer.phone} />
            )}
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
