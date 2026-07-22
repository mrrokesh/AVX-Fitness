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
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
