"use client";

import Link from "next/link";
import ProfileCard from "@/components/bits/ProfileCard";
import { CoachCertList } from "@/components/trainers/CoachCertList";
import { ContactIconBadge } from "@/components/icons/ContactIconBadge";
import { getTrainer } from "@/data/trainers";
import { siteConfig } from "@/data/site";
import { primaryChatUrl } from "@/lib/utils";

type CoachProfileProps = {
  className?: string;
};

export function CoachProfile({ className = "" }: CoachProfileProps) {
  const trainer = getTrainer("kathir");
  if (!trainer) return null;

  const handleContact = () => {
    window.open(primaryChatUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className={`section-pad section-band-soft ${className}`.trim()}
      id="coach"
      aria-labelledby="coach-heading"
    >
      <div className="container-site">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14 xl:gap-16">
          <div className="flex flex-col items-center gap-5 lg:items-stretch">
            <ProfileCard
              name={trainer.name}
              title="Certified Fitness Trainer"
              handle={trainer.instagram?.replace(/^@/, "") || "great_kathir"}
              status={`${siteConfig.membersTrained}+ clients coached`}
              contactText="WhatsApp"
              avatarUrl={trainer.photo}
              miniAvatarUrl={trainer.photo}
              showUserInfo
              enableTilt
              enableMobileTilt={false}
              behindGlowEnabled={false}
              onContactClick={handleContact}
              className="w-full max-w-[380px]"
            />

            <CoachCertList certifications={trainer.certifications} />
          </div>

          <div className="min-w-0 pt-1">
            <p className="inline-flex rounded-full bg-[var(--accent)] px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white">
              Your Coach
            </p>

            <h2
              id="coach-heading"
              className="display mt-4 text-[clamp(2.4rem,5vw,3.75rem)] text-[var(--text)]"
            >
              {trainer.name}
            </h2>

            <p className="mt-2 text-base font-medium text-[var(--text-muted)] sm:text-lg">
              Founder, {siteConfig.name} · Tamil Nadu Fitness Coach · Fat Loss &amp;
              Transformation Coach
            </p>

            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-[var(--text-muted)]">
              <p>
                Kathir is a{" "}
                <strong className="font-semibold text-[var(--text)]">
                  certified fitness trainer
                </strong>{" "}
                and founder of AVX Fitness Studio in Salem. He has coached{" "}
                <strong className="font-semibold text-[var(--text)]">
                  {siteConfig.membersTrained}+ clients
                </strong>{" "}
                through fat loss, muscle gain, and body recomposition — online
                anywhere, and offline in Salem.
              </p>
              <p>
                His approach is{" "}
                <strong className="font-semibold text-[var(--text)]">
                  sustainable over perfect
                </strong>
                : personal training, customized diet plans, weekly
                accountability, and progress tracking so results stick beyond
                the first 90 days.
              </p>
              <p>
                Whether you train from home or at the studio, you get the same
                coach attention — clear plans, honest feedback, and WhatsApp
                support when you need it.
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
                    className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    data-track="coach-instagram"
                  >
                    <ContactIconBadge kind="instagram" size="sm" />
                    {trainer.instagram || "@great_kathir"}
                  </a>
                )}
                <a
                  href={primaryChatUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  data-track="coach-whatsapp"
                >
                  <ContactIconBadge kind="whatsapp" size="sm" />
                  WhatsApp
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  data-track="coach-studio-instagram"
                >
                  <ContactIconBadge kind="instagram" size="sm" />
                  @avx_fit
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/consultation" className="btn btn-primary">
                Book free consult
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
