import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgram, programs } from "@/data/programs";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Program" };
  return {
    title: `${program.name} in ${siteConfig.city}`,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  return (
    <div className="section-pad container-site">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">{program.category}</p>
      <h1 className="display mt-2 text-5xl text-[var(--text)] sm:text-7xl">{program.name}</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--text-muted)]">{program.description}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Info title="Suitable levels" body={program.levels.join(", ")} />
        <Info title="Duration" body={program.duration} />
        <Info title="Session frequency" body={program.frequency} />
        <Info title="Training approach" body={program.approach} />
        <Info title="Nutrition support" body={program.nutritionSupport} />
        <Info title="Trainer support" body={program.trainerSupport} />
      </div>

      <div className="mt-8 glass rounded-[var(--radius)] p-6">
        <h2 className="display text-3xl text-[var(--text)]">Expected outcomes</h2>
        <ul className="mt-3 space-y-2 text-[var(--text-muted)]">
          {program.outcomes.map((o) => (
            <li key={o}>• {o}</li>
          ))}
        </ul>
        <p className="mt-4 text-xl font-semibold text-[var(--accent)]">{program.pricing}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/consultation" className="btn btn-primary">
            Book Consultation
          </Link>
          <Link href="/#waitlist-form" className="btn btn-secondary">
            Register Now
          </Link>
        </div>
      </div>

      {program.slug === "weight-loss" ? <FatLossTransformationPlan /> : null}
    </div>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass rounded-[var(--radius)] p-5">
      <h2 className="text-sm uppercase tracking-wide text-[var(--text-muted)]">{title}</h2>
      <p className="mt-2 text-[var(--text)]">{body}</p>
    </div>
  );
}

function FatLossTransformationPlan() {
  const whoItsFor = [
    "Want to lose body fat without starving themselves.",
    "Want to build lean muscle while getting stronger.",
    "Have tried multiple diets but could not stay consistent.",
    "Have a busy work schedule and need a practical plan.",
    "Want expert guidance instead of guessing what works.",
    "Need accountability to stay on track.",
  ];

  const workoutPlan = [
    "Customized based on your fitness level.",
    "Home or gym workout options.",
    "Step-by-step exercise guidance.",
    "Progressive overload to maximize results.",
  ];

  const nutritionPlan = [
    "Built around your lifestyle and food preferences.",
    "Easy-to-follow meal plans.",
    "Flexible dieting approach.",
    "Restaurant and travel nutrition guidance.",
  ];

  const weeklyReview = [
    "Progress photos",
    "Body measurements",
    "Weight changes",
    "Strength improvements",
    "Adherence to the plan",
  ];

  const weeklyChecklist = [
    "Complete all scheduled workouts",
    "Hit your daily step goal",
    "Follow your nutrition plan",
    "Drink enough water",
    "Sleep 7–8 hours",
    "Submit your weekly check-in",
    "Track your progress consistently",
  ];

  const expectedResults = [
    "Noticeable fat loss",
    "Reduced waist measurement",
    "Increased strength",
    "Better energy levels",
    "Improved confidence",
    "Healthier eating habits",
    "A sustainable fitness routine",
  ];

  const coachingDifference = [
    "Personalized coaching, not copy-paste plans",
    "Daily accountability",
    "Weekly progress reviews",
    "Customized workout and nutrition adjustments",
    "Direct support from your coach",
    "Sustainable fat loss without extreme dieting",
    "Focus on long-term lifestyle change",
  ];

  return (
    <section className="mt-14 border-t border-[var(--border)] pt-14">
      <p className="eyebrow">12-Week Transformation Program</p>
      <h2 className="display mt-3 text-[clamp(2rem,4vw,3.4rem)] text-[var(--text)]">
        Transform your body. Build better habits. Keep the results.
      </h2>
      <p className="mt-4 max-w-4xl text-base text-[var(--text-muted)] md:text-lg">
        This is not another crash diet or generic workout plan. Our 12-week fat loss system is
        designed to help you lose body fat, preserve muscle, improve your fitness, and build
        sustainable habits that last long after the program ends.
      </p>
      <p className="mt-4 max-w-4xl text-base text-[var(--text-muted)] md:text-lg">
        Whether you are a beginner or someone who has struggled with consistency, we guide you
        every step of the way with personalized coaching, nutrition, training, and accountability.
      </p>

      <p className="mt-6 text-sm text-[var(--text-muted)]">
        <Link href="/programs#12-week-fat-loss" className="font-semibold text-[var(--accent)]">
          View program posters on the Programs page
        </Link>
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="glass p-6">
          <h3 className="display text-2xl text-[var(--text)]">Who is this program for?</h3>
          <BulletList items={whoItsFor} className="mt-4" />
        </article>
        <article className="glass p-6">
          <h3 className="display text-2xl text-[var(--text)]">What makes our coaching different?</h3>
          <BulletList items={coachingDifference} className="mt-4" />
        </article>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <article className="glass p-6">
          <h3 className="display text-2xl text-[var(--text)]">What is included?</h3>
          <h4 className="mt-4 text-lg font-semibold text-[var(--text)]">Personalized workout plan</h4>
          <BulletList items={workoutPlan} className="mt-3" />
          <h4 className="mt-5 text-lg font-semibold text-[var(--text)]">
            Customized nutrition plan
          </h4>
          <BulletList items={nutritionPlan} className="mt-3" />
        </article>

        <article className="glass p-6">
          <h3 className="display text-2xl text-[var(--text)]">Daily accountability</h3>
          <p className="mt-3 text-[var(--text-muted)]">
            Our coaching team checks in with you every day to keep you focused and consistent.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Daily submissions
          </p>
          <BulletList
            items={[
              "Morning body weight",
              "Meal photos",
              "Water intake",
              "Daily step count",
              "Workout completion",
            ]}
            className="mt-3"
          />
          <p className="mt-4 text-[var(--text-muted)]">
            Consistency creates results, and we are here to make sure you stay consistent.
          </p>
        </article>
      </div>

      <article className="mt-8 glass p-6">
        <h3 className="display text-2xl text-[var(--text)]">Weekly progress review</h3>
        <p className="mt-3 text-[var(--text-muted)]">Every week we review:</p>
        <BulletList items={weeklyReview} className="mt-3" />
        <p className="mt-4 text-[var(--text-muted)]">
          Your workout and nutrition are adjusted whenever necessary to keep your progress moving.
        </p>
      </article>

      <article className="mt-8 glass p-6">
        <h3 className="display text-2xl text-[var(--text)]">The 3-phase transformation system</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <PhaseCard
            title="Phase 1 (Weeks 1–4)"
            subtitle="Build the foundation"
            points={[
              "Improve daily routine",
              "Learn proper exercise technique",
              "Establish healthy eating habits",
              "Increase activity levels",
              "Build consistency",
            ]}
            goal="Create habits that are easy to maintain."
          />
          <PhaseCard
            title="Phase 2 (Weeks 5–8)"
            subtitle="Accelerate fat loss"
            points={[
              "Increase training intensity",
              "Optimize nutrition",
              "Improve strength",
              "Maximize calorie expenditure",
              "Break through plateaus",
            ]}
            goal="Notice visible body composition changes."
          />
          <PhaseCard
            title="Phase 3 (Weeks 9–12)"
            subtitle="Complete the transformation"
            points={[
              "Fine-tune your physique",
              "Improve muscle definition",
              "Build long-term lifestyle habits",
              "Learn how to maintain your results",
              "Prepare for life after the program",
            ]}
            goal="Finish stronger, leaner, and more confident."
          />
        </div>
      </article>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <article className="glass p-6">
          <h3 className="display text-2xl text-[var(--text)]">Your weekly success checklist</h3>
          <BulletList items={weeklyChecklist} className="mt-4" />
        </article>
        <article className="glass p-6">
          <h3 className="display text-2xl text-[var(--text)]">Expected results</h3>
          <p className="mt-3 text-[var(--text-muted)]">
            Results vary based on your starting point and consistency, but committed clients often
            experience:
          </p>
          <BulletList items={expectedResults} className="mt-3" />
        </article>
      </div>

      <article className="mt-8 glass p-6">
        <h3 className="display text-2xl text-[var(--text)]">How it works</h3>
        <ol className="mt-4 space-y-3 text-[var(--text-muted)]">
          <li>
            <span className="font-semibold text-[var(--text)]">Step 1:</span> Book a consultation
            call.
          </li>
          <li>
            <span className="font-semibold text-[var(--text)]">Step 2:</span> Complete your
            fitness assessment and health questionnaire.
          </li>
          <li>
            <span className="font-semibold text-[var(--text)]">Step 3:</span> Receive your
            customized workout and nutrition plan.
          </li>
          <li>
            <span className="font-semibold text-[var(--text)]">Step 4:</span> Start your 12-week
            transformation with daily coaching and accountability.
          </li>
          <li>
            <span className="font-semibold text-[var(--text)]">Step 5:</span> Track your progress
            every week and celebrate your transformation.
          </li>
        </ol>
      </article>

      <div className="mt-8 glass p-6">
        <h3 className="display text-2xl text-[var(--text)]">Your transformation starts today</h3>
        <p className="mt-3 text-[var(--text-muted)]">
          Your body will not change by waiting for the perfect time. It changes when you commit to
          consistent action with the right guidance.
        </p>
        <p className="mt-3 text-[var(--text-muted)]">
          Join our 12-week fat loss program and experience a structured coaching system designed to
          help you lose fat, build confidence, and create lasting results.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/consultation" className="btn btn-primary">
            Book consultation call
          </Link>
          <Link href="/#waitlist-form" className="btn btn-secondary">
            Start registration
          </Link>
        </div>
      </div>
    </section>
  );
}

function BulletList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 text-[var(--text-muted)] ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 bg-[var(--accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PhaseCard({
  title,
  subtitle,
  points,
  goal,
}: {
  title: string;
  subtitle: string;
  points: string[];
  goal: string;
}) {
  return (
    <div className="border border-[var(--border)] p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{title}</p>
      <h4 className="mt-2 text-lg font-semibold text-[var(--text)]">{subtitle}</h4>
      <BulletList items={points} className="mt-3 text-sm" />
      <p className="mt-4 text-sm text-[var(--text-muted)]">
        <span className="font-semibold text-[var(--text)]">Goal:</span> {goal}
      </p>
    </div>
  );
}
