export type Program = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  levels: string[];
  duration: string;
  frequency: string;
  outcomes: string[];
  approach: string;
  nutritionSupport: string;
  trainerSupport: string;
  pricing: string;
  category: string;
};

export const programs: Program[] = [
  {
    slug: "weight-loss",
    name: "Fat Loss",
    shortDescription: "Lose fat, boost energy, feel confident — including 90-day focus plans.",
    description:
      "AVX fat-loss coaching pairs personal training, a personal diet plan and accountability so you lose fat without crash diets. Ideal for clients who want measurable change in as little as 60–90 days with online or offline support.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: "60–90 days (renewable)",
    frequency: "3–5 sessions / week",
    outcomes: ["Lose fat", "Boost energy", "Feel confident"],
    approach: "Goal-oriented plans with regular progress tracking and 24/7 guidance.",
    nutritionSupport: "Personal diet plan and customized nutrition coaching.",
    trainerSupport: "Kathir with accountability check-ins and WhatsApp support.",
    pricing: "WhatsApp 9344740075",
    category: "Fat Loss",
  },
  {
    slug: "muscle-building",
    name: "Muscle Gain",
    shortDescription: "Build muscle, increase strength, transform your physique.",
    description:
      "Hypertrophy-focused muscle gain programming with progressive training and nutrition support — the same slow-and-steady approach behind AVX online transformations like Meialagan’s 24 kg gain journey.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: "12–24 weeks+",
    frequency: "4–6 sessions / week",
    outcomes: ["Build muscle", "Increase strength", "Transform physique"],
    approach: "Consistent training, disciplined nutrition and patient progress tracking.",
    nutritionSupport: "Surplus planning and protein-focused meal guidance.",
    trainerSupport: "Form coaching and program adjustments with Kathir.",
    pricing: "WhatsApp 9344740075",
    category: "Muscle",
  },
  {
    slug: "body-recomposition",
    name: "Body Recomposition",
    shortDescription: "Lose fat and gain muscle with sustainable results.",
    description:
      "Shape your body by losing fat while building muscle — sustainable recomposition with customized workouts, nutrition and accountability from AVX Fitness.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: "12–36 weeks",
    frequency: "3–5 sessions / week",
    outcomes: ["Lose fat & gain muscle", "Shape your body", "Sustainable results"],
    approach: "Balanced training + nutrition with weekly accountability.",
    nutritionSupport: "Customized nutrition timed to your training.",
    trainerSupport: "Dedicated coaching online or offline in Salem.",
    pricing: "WhatsApp 9344740075",
    category: "Recomposition",
  },
  {
    slug: "strength-training",
    name: "Strength Training",
    shortDescription: "Build raw strength with structured progressive overload.",
    description:
      "Compound-lift focused programming for squat, hinge, press and pull strength with technical coaching and recovery management.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: "8–16 weeks",
    frequency: "3–5 sessions / week",
    outcomes: ["Higher working lifts", "Improved joint stability", "Confident technique"],
    approach: "Linear and undulating periodisation with technique cues.",
    nutritionSupport: "Optional performance nutrition guidance.",
    trainerSupport: "In-person spotting and cueing available.",
    pricing: "WhatsApp 9344740075",
    category: "Strength",
  },
  {
    slug: "personal-training",
    name: "Personal Training",
    shortDescription: "1:1 coaching with personal diet plans and accountability.",
    description:
      "Fully personalised sessions with Kathir — assessment, programming, technique, personal diet plan and 24/7 guidance for serious results.",
    levels: ["All levels"],
    duration: "Flexible packages",
    frequency: "2–5 sessions / week",
    outcomes: ["Faster skill acquisition", "Higher accountability", "Custom programming"],
    approach: "Assessment-led programming with session-by-session adjustments.",
    nutritionSupport: "Personal diet plan included with coaching packages.",
    trainerSupport: "Direct 1:1 with Kathir via studio or online.",
    pricing: "WhatsApp 9344740075",
    category: "Personal Training",
  },
  {
    slug: "functional-fitness",
    name: "Functional Fitness",
    shortDescription: "Move better for life, sport and daily performance.",
    description:
      "Multi-planar strength, mobility and conditioning designed to improve real-world movement quality and resilience.",
    levels: ["Beginner", "Intermediate"],
    duration: "8–12 weeks",
    frequency: "3–4 sessions / week",
    outcomes: ["Better mobility", "Improved athleticism", "Injury resilience"],
    approach: "Movement patterns, carries, unilateral work and conditioning.",
    nutritionSupport: "General nutrition coaching available.",
    trainerSupport: "Group and semi-private options.",
    pricing: "Contact for Pricing",
    category: "Functional",
  },
  {
    slug: "hiit",
    name: "HIIT",
    shortDescription: "High-intensity intervals for conditioning and fat loss.",
    description:
      "Time-efficient interval sessions with controlled intensity, recovery intervals and progressive conditioning blocks.",
    levels: ["Intermediate", "Advanced"],
    duration: "4–8 weeks",
    frequency: "2–4 sessions / week",
    outcomes: ["Improved conditioning", "Higher work capacity", "Efficient sessions"],
    approach: "Work-to-rest protocols scaled to fitness level.",
    nutritionSupport: "Optional calorie and recovery guidance.",
    trainerSupport: "Coach-led group sessions.",
    pricing: "Contact for Pricing",
    category: "Conditioning",
  },
  {
    slug: "cross-training",
    name: "Cross Training",
    shortDescription: "Varied strength and conditioning for all-round fitness.",
    description:
      "A balanced mix of strength, gymnastics skill work and metabolic conditioning to build complete fitness.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: "Ongoing",
    frequency: "3–5 sessions / week",
    outcomes: ["Balanced fitness", "Skill progression", "Community training"],
    approach: "Varied daily programming with scalable options.",
    nutritionSupport: "Optional nutrition add-on.",
    trainerSupport: "Floor coaches during class hours.",
    pricing: "Contact for Pricing",
    category: "Conditioning",
  },
  {
    slug: "body-transformation",
    name: "Body Transformation",
    shortDescription: "Complete coaching for physique and performance change.",
    description:
      "A comprehensive transformation track combining training, nutrition, recovery and accountability over a defined timeline.",
    levels: ["All levels"],
    duration: "12–24 weeks",
    frequency: "4–6 sessions / week",
    outcomes: ["Visible physique change", "Habit consistency", "Measurable progress"],
    approach: "Phased training + nutrition with bi-weekly reviews.",
    nutritionSupport: "Full nutrition coaching included.",
    trainerSupport: "Assigned transformation coach.",
    pricing: "Contact for Pricing",
    category: "Transformation",
  },
  {
    slug: "womens-fitness",
    name: "Women’s Fitness",
    shortDescription: "Strength-focused coaching designed for women.",
    description:
      "Programming that prioritises strength, confidence and sustainable results in a supportive training environment.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: "8–16 weeks",
    frequency: "3–5 sessions / week",
    outcomes: ["Strength gains", "Body confidence", "Sustainable habits"],
    approach: "Strength-first programming with optional group classes.",
    nutritionSupport: "Women-specific nutrition coaching available.",
    trainerSupport: "Female and mixed coach options.",
    pricing: "Contact for Pricing",
    category: "Women",
  },
  {
    slug: "beginner-fitness",
    name: "Beginner Fitness",
    shortDescription: "A confident start for first-time gym members.",
    description:
      "Foundational movement coaching, gym orientation and progressive programming for people new to training.",
    levels: ["Beginner"],
    duration: "6–12 weeks",
    frequency: "3 sessions / week",
    outcomes: ["Gym confidence", "Solid technique", "Habit formation"],
    approach: "Technique-first onboarding with simple progressive plans.",
    nutritionSupport: "Foundational nutrition education.",
    trainerSupport: "High-touch coaching in early weeks.",
    pricing: "Contact for Pricing",
    category: "Beginner",
  },
  {
    slug: "online-coaching",
    name: "Online Coaching",
    shortDescription: "Online fitness training anywhere. Anytime.",
    description:
      "Remote coaching with custom workouts, personal diet plans, form review and accountability — the same online system behind AVX client transformations.",
    levels: ["All levels"],
    duration: "Monthly ongoing",
    frequency: "4–6 remote sessions / week",
    outcomes: ["Train anywhere", "Consistent progress", "Expert guidance anytime"],
    approach: "WhatsApp / video check-ins with personalized programming.",
    nutritionSupport: "Personal diet plan included.",
    trainerSupport: "Kathir — message 9344740075 to start.",
    pricing: "WhatsApp 9344740075",
    category: "Online",
  },
  {
    slug: "nutrition-coaching",
    name: "Nutrition Coaching",
    shortDescription: "Customized nutrition and personal diet plans.",
    description:
      "Practical nutrition coaching built around home-cooked food, right portions and consistency — not expensive diets or shortcuts.",
    levels: ["All levels"],
    duration: "8–12 weeks",
    frequency: "Weekly check-ins",
    outcomes: ["Clearer eating structure", "Better adherence", "Goal-aligned fueling"],
    approach: "Education-first coaching with flexible meal frameworks.",
    nutritionSupport: "Core focus of the program.",
    trainerSupport: "Kathir with optional training collaboration.",
    pricing: "WhatsApp 9344740075",
    category: "Nutrition",
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
