export type MembershipPlan = {
  id: string;
  name: string;
  price: string;
  duration: string;
  facilities: string[];
  sessions: string;
  trainerSupport: string;
  nutritionSupport: string;
  terms: string;
  recommended?: boolean;
};

export const membershipPlans: MembershipPlan[] = [
  {
    id: "monthly",
    name: "Monthly Membership",
    price: "DM for pricing",
    duration: "1 month",
    facilities: ["Full gym access", "Locker rooms", "Group class access"],
    sessions: "Unlimited floor access",
    trainerSupport: "Floor coaching during open hours",
    nutritionSupport: "Optional add-on",
    terms: "Cancel anytime before renewal. Freeze terms available on request.",
  },
  {
    id: "quarterly",
    name: "Quarterly Membership",
    price: "DM for pricing",
    duration: "3 months",
    facilities: ["Full gym access", "Locker rooms", "Group class access"],
    sessions: "Unlimited floor access",
    trainerSupport: "Floor coaching + 1 assessment",
    nutritionSupport: "Introductory nutrition session",
    terms: "One freeze period up to 14 days.",
    recommended: true,
  },
  {
    id: "half-yearly",
    name: "Half-Yearly Membership",
    price: "DM for pricing",
    duration: "6 months",
    facilities: ["Full gym access", "Locker rooms", "Priority class booking"],
    sessions: "Unlimited floor access",
    trainerSupport: "Quarterly progress reviews",
    nutritionSupport: "Two nutrition check-ins",
    terms: "Freeze up to 30 days with notice.",
  },
  {
    id: "annual",
    name: "Annual Membership",
    price: "DM for pricing",
    duration: "12 months",
    facilities: ["Full gym access", "Locker rooms", "Priority booking", "Guest passes"],
    sessions: "Unlimited floor access",
    trainerSupport: "Bi-monthly coaching reviews",
    nutritionSupport: "Quarterly nutrition reviews",
    terms: "Freeze up to 45 days with notice.",
  },
  {
    id: "personal-training",
    name: "Personal Training Package",
    price: "DM for pricing",
    duration: "Custom package",
    facilities: ["PT studio access", "Programming", "Form coaching"],
    sessions: "8 / 12 / 20 session packs",
    trainerSupport: "Dedicated 1:1 trainer",
    nutritionSupport: "Included with selected packs",
    terms: "Sessions valid for package duration. Reschedules with 12h notice.",
  },
  {
    id: "couple",
    name: "Couple Membership",
    price: "DM for pricing",
    duration: "3–12 months",
    facilities: ["Dual memberships", "Shared guest privileges"],
    sessions: "Unlimited floor access for two",
    trainerSupport: "Shared assessment session",
    nutritionSupport: "Optional couple nutrition consult",
    terms: "Both members must remain active on the same plan.",
  },
  {
    id: "student",
    name: "Student Membership",
    price: "DM for pricing",
    duration: "1–3 months",
    facilities: ["Full gym access", "Off-peak preferential hours"],
    sessions: "Unlimited floor access",
    trainerSupport: "Floor coaching",
    nutritionSupport: "Optional add-on",
    terms: "Valid student ID required. Standard freeze policy applies.",
  },
  {
    id: "online",
    name: "Online Coaching",
    price: "DM for pricing",
    duration: "Monthly",
    facilities: ["Custom programming", "Video form review", "Chat support"],
    sessions: "4–6 programmed sessions / week",
    trainerSupport: "Remote coach check-ins",
    nutritionSupport: "Included",
    terms: "Cancel with 7 days notice before renewal.",
  },
];
