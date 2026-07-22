export type Trainer = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  certifications: string[];
  specializations: string[];
  yearsExperience: number;
  bio: string;
  modes: string[];
  availability: string;
  phone?: string;
  instagram?: string;
  instagramUrl?: string;
  filters: string[];
};

/**
 * Coaches confirmed from public AVX Fitness Instagram (@avx_fit).
 */
export const trainers: Trainer[] = [
  {
    slug: "kathir",
    name: "Kathir",
    role: "Founder & Certified Fitness Trainer",
    photo: "/images/trainers/kathir.jpg",
    certifications: [
      "Fat Loss & Transformation Coach",
    ],
    specializations: [
      "Fat loss",
      "Muscle gain",
      "Body recomposition",
      "Online coaching",
      "Offline studio coaching",
      "Personal diet plans",
    ],
    yearsExperience: 0,
    bio: "Founder of AVX Fitness Studio in Salem. Kathir is a certified fitness trainer who has coached 600+ clients through fat loss, muscle gain and body recomposition — with personal training, customized nutrition, accountability and progress tracking. Online anywhere, anytime. Offline in Salem. Message WhatsApp 9344740075 to start.",
    modes: ["In person", "Online coaching", "WhatsApp coaching"],
    availability: "WhatsApp 9344740075 · Instagram DM @avx_fit",
    phone: "9344740075",
    instagram: "@kathir_lifts",
    instagramUrl: "https://www.instagram.com/kathir_lifts/",
    filters: [
      "strength-training",
      "fat-loss",
      "bodybuilding",
      "online-coaching",
      "womens-fitness",
    ],
  },
];

export const trainerFilters = [
  { id: "strength-training", label: "Strength training" },
  { id: "fat-loss", label: "Fat loss" },
  { id: "bodybuilding", label: "Bodybuilding" },
  { id: "functional-fitness", label: "Functional fitness" },
  { id: "rehabilitation", label: "Rehabilitation" },
  { id: "womens-fitness", label: "Women’s fitness" },
  { id: "online-coaching", label: "Online coaching" },
] as const;

export function getTrainer(slug: string) {
  return trainers.find((t) => t.slug === slug);
}
