export type Transformation = {
  id: string;
  clientName: string;
  duration: string;
  result: string;
  beforeWeight?: string;
  afterWeight?: string;
  testimonial: string;
  program: string;
  trainer: string;
  beforeImage: string;
  afterImage: string;
  posterImage: string;
  videoUrl?: string;
  consentVerified: boolean;
};

export type InstagramReel = {
  id: string;
  src: string;
  poster?: string;
  label: string;
};

/**
 * Transformations sourced from official @avx_fit Instagram posts
 * published by AVX Fitness (client stories already shared publicly by the brand).
 */
export const transformations: Transformation[] = [
  {
    id: "murugan",
    clientName: "Murugan",
    duration: "7 months",
    result: "Lost 28 kg",
    beforeWeight: "137 kg",
    afterWeight: "109 kg",
    testimonial:
      "Consistency, discipline, right nutrition, hard work and a strong mindset — one decision changed everything.",
    program: "Fat Loss",
    trainer: "Kathir",
    beforeImage: "/images/transformations/murugan.jpg",
    afterImage: "/images/transformations/murugan.jpg",
    posterImage: "/images/transformations/murugan.jpg",
    consentVerified: true,
  },
  {
    id: "gokul",
    clientName: "Gokul",
    duration: "9 months",
    result: "Lost 21 kg",
    beforeWeight: "78 kg",
    afterWeight: "57 kg",
    testimonial:
      "Discipline builds you. Consistency changes you. Dedication transforms you — proof that showing up beats excuses.",
    program: "Body Recomposition",
    trainer: "Kathir",
    beforeImage: "/images/transformations/gokul.jpg",
    afterImage: "/images/transformations/gokul.jpg",
    posterImage: "/images/transformations/gokul.jpg",
    consentVerified: true,
  },
  {
    id: "meialagan",
    clientName: "Meialagan",
    duration: "3 years",
    result: "Gained 24 kg",
    beforeWeight: "45 kg",
    afterWeight: "69 kg",
    testimonial:
      "Slow and steady transform through online training — consistent training, disciplined nutrition and trusting the process.",
    program: "Muscle Gain",
    trainer: "Kathir",
    beforeImage: "/images/transformations/meialagan.jpg",
    afterImage: "/images/transformations/meialagan.jpg",
    posterImage: "/images/transformations/meialagan.jpg",
    consentVerified: true,
  },
  {
    id: "arun",
    clientName: "Arun",
    duration: "Ongoing",
    result: "Lost 12 kg",
    beforeWeight: "95 kg",
    afterWeight: "83 kg",
    testimonial:
      "Consistently training for years with focus on strength, health and lifestyle — no shortcuts, just hard work.",
    program: "Strength & Lifestyle",
    trainer: "Kathir",
    beforeImage: "/images/transformations/arun.jpg",
    afterImage: "/images/transformations/arun.jpg",
    posterImage: "/images/transformations/arun.jpg",
    consentVerified: true,
  },
  {
    id: "jeevith",
    clientName: "Jeevith",
    duration: "60 days",
    result: "Lost 11 kg",
    beforeWeight: "106 kg",
    afterWeight: "95 kg",
    testimonial:
      "Consistency today, transform tomorrow — discipline, dedication and results before excuses.",
    program: "Fat Loss",
    trainer: "Kathir",
    beforeImage: "/images/transformations/jeevith.jpg",
    afterImage: "/images/transformations/jeevith.jpg",
    posterImage: "/images/transformations/jeevith.jpg",
    consentVerified: true,
  },
  {
    id: "kiruthigaa",
    clientName: "Kiruthigaa",
    duration: "90 days",
    result: "Lost 10 kg",
    beforeWeight: "77 kg",
    afterWeight: "67 kg",
    testimonial:
      "No gym. No expensive diets. Just home-cooked food, home workouts and unbreakable discipline.",
    program: "Online Fat Loss",
    trainer: "Kathir",
    beforeImage: "/images/transformations/kiruthigaa.jpg",
    afterImage: "/images/transformations/kiruthigaa.jpg",
    posterImage: "/images/transformations/kiruthigaa.jpg",
    consentVerified: true,
  },
];

/** Short reels from the official @avx_fit Drive / Instagram export */
export const instagramReels: InstagramReel[] = [
  {
    id: "r1",
    src: "/videos/instagram/reel-01.mp4",
    poster: "/images/gallery/avx/avx_fit-20260716-0004.jpg",
    label: "12-week program",
  },
  {
    id: "r2",
    src: "/videos/instagram/reel-02.mp4",
    poster: "/images/gallery/avx/avx_fit-20260716-0005.jpg",
    label: "Training energy",
  },
  {
    id: "r3",
    src: "/videos/instagram/reel-03.mp4",
    poster: "/images/gallery/avx/avx_fit-20260716-0006.jpg",
    label: "Coach session",
  },
  {
    id: "r4",
    src: "/videos/instagram/reel-04.mp4",
    poster: "/images/gallery/avx/avx_fit-20260716-0007.jpg",
    label: "Client grind",
  },
  {
    id: "r5",
    src: "/videos/instagram/reel-05.mp4",
    poster: "/images/gallery/avx/avx_fit-20260716-0008.jpg",
    label: "Transformation vibe",
  },
  {
    id: "r6",
    src: "/videos/instagram/reel-06.mp4",
    poster: "/images/gallery/avx/avx_fit-20260716-0009.jpg",
    label: "AVX Fit reel",
  },
];

export const faqs = [
  {
    question: "Can beginners join?",
    answer:
      "Yes. Beginners are welcome — Kathir designs goal-oriented plans with personal diet guidance and progress tracking so you start safely and build confidence.",
  },
  {
    question: "Do you provide personal training?",
    answer:
      "Yes. AVX offers personal training, personal diet plans, accountability support and regular progress tracking — online anywhere, anytime, and offline in Salem.",
  },
  {
    question: "Is nutrition guidance included?",
    answer:
      "Yes. Coaching includes customized nutrition and personal diet planning. Guidance is educational and is not medical advice.",
  },
  {
    question: "Can I train online?",
    answer:
      "Yes. Online fitness training is available anywhere, anytime — including home workouts with home-cooked food plans, the same system used in client transformations like Kiruthigaa’s 90-day journey.",
  },
  {
    question: "How do I contact AVX Fitness?",
    answer:
      "WhatsApp 9344740075, call the same number, or DM @avx_fit on Instagram. You can also book a free consultation on this website.",
  },
  {
    question: "Do you offer a free consultation?",
    answer:
      "Yes. Book a free consultation through the website, or message on WhatsApp to discuss fat loss, muscle gain or body recomposition goals.",
  },
  {
    question: "What programs do you focus on?",
    answer:
      "Fat loss, muscle gain and body recomposition — with 90-day focus plans, accountability and 24/7 support for serious clients.",
  },
  {
    question: "Where is the studio?",
    answer:
      "AVX Fitness Studio is in Salem, Tamil Nadu. Ask via WhatsApp for the latest pin, parking and session timings.",
  },
  {
    question: "Can I reschedule a consultation?",
    answer:
      "Yes. Reschedule via WhatsApp 9344740075 or Instagram DM, subject to availability.",
  },
  {
    question: "How is my registration data used?",
    answer:
      "Registration data is used to process your enquiry, schedule consultations and communicate about coaching options. See our Privacy Policy for details.",
  },
];

export const facilities = [
  {
    id: "strength",
    name: "Strength Training",
    description: "Effective workout programs for muscle, strength and physique goals.",
  },
  {
    id: "fatloss",
    name: "Fat Loss Coaching",
    description: "Structured fat-loss systems with diet, tracking and accountability.",
  },
  {
    id: "online",
    name: "Online Coaching",
    description: "Train anywhere, anytime with remote programming and check-ins.",
  },
  {
    id: "offline",
    name: "Offline Studio Coaching",
    description: "In-person coaching at AVX Fitness Studio, Salem.",
  },
  {
    id: "nutrition",
    name: "Personal Diet Plans",
    description: "Customized nutrition built around home-cooked food and consistency.",
  },
  {
    id: "accountability",
    name: "Accountability Team",
    description: "Motivation, check-ins and 24/7 support so you stay on track.",
  },
  {
    id: "tracking",
    name: "Progress Tracking",
    description: "Regular reviews so you see real change — not guesswork.",
  },
  {
    id: "recomp",
    name: "Body Recomposition",
    description: "Lose fat and gain muscle with sustainable, patient programming.",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Message AVX Fitness",
    description:
      "WhatsApp 9344740075 or DM @avx_fit — share your goal: fat loss, muscle gain or recomposition.",
  },
  {
    step: 2,
    title: "Free Consultation",
    description:
      "Talk with Kathir about your schedule, body and timeline — online or offline in Salem.",
  },
  {
    step: 3,
    title: "Get Your Custom Plan",
    description:
      "Receive a personal diet plan, workout program and accountability system built for you.",
  },
  {
    step: 4,
    title: "Train, Track, Transform",
    description:
      "Show up with discipline. We track progress and keep you accountable until results stick.",
  },
];
