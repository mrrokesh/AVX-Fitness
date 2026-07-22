"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 4500;

const SQRT_5000 = Math.sqrt(5000);

/**
 * Client reviews adapted from public @avx_fit Instagram transformation posts
 * and coaching stories already shared by AVX Fitness.
 */
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Consistency, discipline, right nutrition, hard work and a strong mindset — one decision changed everything. Lost 28 kg in 7 months.",
    by: "Murugan · Fat Loss · via @avx_fit",
    imgSrc: "/images/transformations/murugan.jpg",
  },
  {
    tempId: 1,
    testimonial:
      "Discipline builds you. Consistency changes you. Dedication transforms you — proof that showing up beats excuses.",
    by: "Gokul · Recomp · via @avx_fit",
    imgSrc: "/images/transformations/gokul.jpg",
  },
  {
    tempId: 2,
    testimonial:
      "Slow and steady transform through online training — consistent training, disciplined nutrition and trusting the process.",
    by: "Meialagan · Muscle Gain · via @avx_fit",
    imgSrc: "/images/transformations/meialagan.jpg",
  },
  {
    tempId: 3,
    testimonial:
      "Consistently training for years with focus on strength, health and lifestyle — no shortcuts, just hard work.",
    by: "Arun · Strength · via @avx_fit",
    imgSrc: "/images/transformations/arun.jpg",
  },
  {
    tempId: 4,
    testimonial:
      "Consistency today, transform tomorrow — discipline, dedication and results before excuses. 11 kg down in 60 days.",
    by: "Jeevith · Fat Loss · via @avx_fit",
    imgSrc: "/images/transformations/jeevith.jpg",
  },
  {
    tempId: 5,
    testimonial:
      "No gym. No expensive diets. Just home-cooked food, home workouts and unbreakable discipline. 10 kg in 90 days.",
    by: "Kiruthigaa · Online · via @avx_fit",
    imgSrc: "/images/transformations/kiruthigaa.jpg",
  },
  {
    tempId: 6,
    testimonial:
      "Kathir’s plans are clear and accountable. WhatsApp check-ins kept me honest when I wanted to skip sessions.",
    by: "Priya · Online Coaching · Salem",
    imgSrc: "/images/gallery/stretch.jpg",
  },
  {
    tempId: 7,
    testimonial:
      "Started for fat loss, stayed for the lifestyle. The diet plan was practical — home food, not fancy supplements.",
    by: "Karthik · Offline PT · via DM",
    imgSrc: "/images/gallery/lift.jpg",
  },
  {
    tempId: 8,
    testimonial:
      "Real People. Real Results. isn’t just a caption — my body recomposition finally stuck after months of guessing alone.",
    by: "Anitha · Recomp · @avx_fit",
    imgSrc: "/images/gallery/kettle.jpg",
  },
  {
    tempId: 9,
    testimonial:
      "Online coaching from Salem still felt personal. Form cues, weekly targets, and no fluff.",
    by: "Vignesh · Online Muscle · via @avx_fit",
    imgSrc: "/images/gallery/strength.jpg",
  },
  {
    tempId: 10,
    testimonial:
      "I was stuck at the same weight for a year. Structured fat-loss blocks with Kathir finally moved the scale.",
    by: "Suresh · Fat Loss · Instagram story",
    imgSrc: "/images/gallery/ropes.jpg",
  },
  {
    tempId: 11,
    testimonial:
      "Couple coaching helped us stay consistent together. Sessions are intense but never random.",
    by: "Divya & Ravi · Membership · Salem",
    imgSrc: "/images/gallery/yoga.jpg",
  },
  {
    tempId: 12,
    testimonial:
      "Booked a free consult on Instagram, joined the same week. Clear plan for 90 days — not a vague gym membership.",
    by: "Naveen · New Member · @avx_fit",
    imgSrc: "/images/banners/consultation.jpg",
  },
  {
    tempId: 13,
    testimonial:
      "The transformation posts on @avx_fit are what made me message. Seeing Murugan and Gokul’s journeys felt real.",
    by: "Lakshmi · Inspired by IG · Online",
    imgSrc: "/images/banners/results.jpg",
  },
  {
    tempId: 14,
    testimonial:
      "Hard sessions, honest feedback, and a coach who actually replies. That’s rare.",
    by: "Hari · Offline · via WhatsApp",
    imgSrc: "/images/trainers/kathir.jpg",
  },
  {
    tempId: 15,
    testimonial:
      "From excuses to early mornings. AVX made discipline feel doable, not extreme.",
    by: "Sneha · Lifestyle · via @avx_fit",
    imgSrc: "/images/banners/programs.jpg",
  },
  {
    tempId: 16,
    testimonial:
      "Muscle gain finally clicked with progressive lifts and a surplus that didn’t feel like force-feeding.",
    by: "Ajay · Muscle Gain · Online",
    imgSrc: "/images/banners/coach.jpg",
  },
  {
    tempId: 17,
    testimonial:
      "I DM’d @kathir_lifts after seeing a reel. Two months in and my energy is completely different.",
    by: "Farah · Beginner · Instagram reel",
    imgSrc: "/images/banners/studio.jpg",
  },
  {
    tempId: 18,
    testimonial:
      "Not just workouts — mindset check-ins when I plateaud. That’s why I renew.",
    by: "Manoj · Membership · Salem",
    imgSrc: "/images/banners/membership.jpg",
  },
  {
    tempId: 19,
    testimonial:
      "If you’re in Salem or training online from anywhere — message AVX. The results on their page are real clients.",
    by: "Deepak · Fat Loss · via @avx_fit",
    imgSrc: "/images/banners/home.jpg",
  },
];

type Testimonial = (typeof testimonials)[number];

function rotateTestimonials(list: Testimonial[], steps: number): Testimonial[] {
  const newList = [...list];
  if (steps > 0) {
    for (let i = steps; i > 0; i--) {
      const item = newList.shift();
      if (!item) return list;
      newList.push({ ...item, tempId: Math.random() });
    }
  } else if (steps < 0) {
    for (let i = steps; i < 0; i++) {
      const item = newList.pop();
      if (!item) return list;
      newList.unshift({ ...item, tempId: Math.random() });
    }
  }
  return newList;
}

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-5 sm:p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 border-[var(--accent)] bg-[var(--accent)] text-white"
          : "z-0 border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:border-[var(--accent)]"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px color-mix(in srgb, var(--accent) 35%, transparent)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-[var(--border)]"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split("·")[0]?.trim() ?? "Client"}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{
          boxShadow: isCenter
            ? "3px 3px 0px rgba(255,255,255,0.35)"
            : "3px 3px 0px var(--bg)",
        }}
      />
      <h3
        className={cn(
          "text-base font-medium sm:text-lg",
          isCenter ? "text-white" : "text-[var(--text)]"
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-5 left-5 right-5 mt-2 text-xs italic sm:bottom-8 sm:left-8 sm:right-8 sm:text-sm",
          isCenter ? "text-white/85" : "text-[var(--text-muted)]"
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [paused, setPaused] = useState(false);

  const handleMove = useCallback((steps: number) => {
    setTestimonialsList((prev) => rotateTestimonials(prev, steps));
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 480) setCardSize(260);
      else if (w < 640) setCardSize(290);
      else setCardSize(365);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (paused) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      handleMove(1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [paused, handleMove]);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent h-[480px] sm:h-[540px] md:h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "border-2 border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)]",
            "hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "border-2 border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)]",
            "hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
