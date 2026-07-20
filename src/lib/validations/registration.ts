import { z } from "zod";

const requiredTrimmed = (label: string, min = 1) =>
  z
    .string()
    .trim()
    .min(min, min > 1 ? `${label} must be at least ${min} characters` : `${label} is required`);

const requiredEmail = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const requiredPhoneDigits = (label = "Phone") =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .regex(/^\d{7,15}$/, `${label} must be 7–15 digits (numbers only)`);

const requiredNumber = (label: string, min: number, max: number) =>
  z
    .number({ message: `${label} is required` })
    .min(min, `${label} must be at least ${min}`)
    .max(max, `${label} must be at most ${max}`);

export const waitlistStep1Schema = z.object({
  fullName: requiredTrimmed("Full name", 2),
  countryCode: z.string().min(1, "Country code is required"),
  whatsapp: requiredPhoneDigits("WhatsApp number"),
  email: requiredEmail,
  age: requiredNumber("Age", 13, 100),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    message: "Please select gender",
  }),
});

export const waitlistStep2Schema = z.object({
  city: requiredTrimmed("City", 2),
  profession: z.string().trim().min(1, "Please select your profession"),
  currentWeightKg: requiredNumber("Weight", 30, 300),
  heightCm: requiredNumber("Height", 100, 250),
  availableTimePerDay: z.enum([
    "Less than 20 min",
    "20–30 min",
    "30–45 min",
    "45–60 min",
    "60+ min",
  ]),
  commitmentLevel: z.number().int().min(1).max(10),
});

export const waitlistStep3Schema = z.object({
  primaryGoal: z.string().trim().min(1, "Please select your primary goal"),
  fitnessExperience: z.string().trim().min(1, "Please select your experience level"),
  previousProgramsTried: z.array(z.string()).default([]),
  twelveWeekGoal: requiredTrimmed("12-week goal", 5),
  biggestChallenge: requiredTrimmed("Biggest challenge", 5),
});

export const waitlistStep4Schema = z.object({
  startTiming: z.enum(["Immediately", "This Month", "Next Month", "Just Exploring"], {
    message: "Please select when you want to start",
  }),
  readyToInvest: z.enum(["Yes", "No"], {
    message: "Please select Yes or No",
  }),
  preferredDate: z.string().trim().min(1, "Please select a preferred date"),
  preferredTime: z.string().trim().min(1, "Please select a preferred time"),
});

export const waitlistFormSchema = waitlistStep1Schema
  .merge(waitlistStep2Schema)
  .merge(waitlistStep3Schema)
  .merge(waitlistStep4Schema)
  .extend({
    leadSource: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  });

export type WaitlistFormInput = z.infer<typeof waitlistFormSchema>;

/** Maps waitlist payload into the existing registration storage shape */
export function waitlistToRegistrationPayload(data: WaitlistFormInput) {
  return {
    fullName: data.fullName,
    email: data.email,
    countryCode: data.countryCode,
    whatsapp: data.whatsapp,
    age: data.age,
    gender: data.gender,
    city: data.city,
    preferredLanguage: "English",
    heightCm: data.heightCm,
    currentWeightKg: data.currentWeightKg,
    targetWeightKg: data.currentWeightKg,
    activityLevel: "Moderately active" as const,
    fitnessExperience:
      data.fitnessExperience.includes("Beginner")
        ? ("Beginner" as const)
        : data.fitnessExperience.includes("Advanced") ||
            data.fitnessExperience.includes("Athlete")
          ? ("Advanced" as const)
          : ("Intermediate" as const),
    existingMembership: "No" as const,
    workoutLocation: "Both" as const,
    availableTimePerDay:
      data.availableTimePerDay === "Less than 20 min" ||
      data.availableTimePerDay === "20–30 min"
        ? ("15–30 min" as const)
        : data.availableTimePerDay === "30–45 min"
          ? ("30–45 min" as const)
          : data.availableTimePerDay === "45–60 min"
            ? ("45–60 min" as const)
            : ("60+ min" as const),
    goals: [data.primaryGoal],
    targetPeriod: data.startTiming,
    biggestChallenge: data.biggestChallenge,
    previousPrograms: data.previousProgramsTried.join("; "),
    preferredProgram: data.primaryGoal,
    preferredTrainer: "Kathir",
    additionalMessage: [
      `Profession: ${data.profession}`,
      `Commitment: ${data.commitmentLevel}/10`,
      `12-week goal: ${data.twelveWeekGoal}`,
      `Ready to invest: ${data.readyToInvest}`,
      `Start timing: ${data.startTiming}`,
    ].join("\n"),
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime.split(" to ")[0]?.replace(/\s/g, "") || data.preferredTime,
    consultationType: "WhatsApp call" as const,
    preferredBranch: "Online",
    preferredTrainerBooking: "kathir",
    privacyAccepted: true,
    contactConsent: true,
    medicalDisclaimer: true,
    marketingConsent: false,
    leadSource: data.leadSource ?? "waitlist-form",
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
  };
}

// Keep legacy schemas used by other forms/APIs
export const personalInfoSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  countryCode: z.string().min(1),
  whatsapp: z.string().min(7).max(15).regex(/^\d+$/),
  age: z.number().int().min(13).max(100),
  gender: z.enum(["Female", "Male", "Non-binary", "Prefer not to say", "Other"]),
  city: z.string().min(2),
  preferredLanguage: z.string().min(1),
});

export const fitnessInfoSchema = z.object({
  heightCm: z.number().min(100).max(250),
  currentWeightKg: z.number().min(30).max(300),
  targetWeightKg: z.number().min(30).max(300),
  activityLevel: z.enum([
    "Sedentary",
    "Lightly active",
    "Moderately active",
    "Very active",
    "Athlete",
  ]),
  fitnessExperience: z.enum(["Beginner", "Intermediate", "Advanced"]),
  existingMembership: z.enum(["Yes", "No"]),
  workoutLocation: z.enum(["Gym", "Home", "Both", "Online"]),
  availableTimePerDay: z.enum(["15–30 min", "30–45 min", "45–60 min", "60+ min"]),
});

export const goalsSchema = z.object({
  goals: z.array(z.string()).min(1),
  targetPeriod: z.string().min(1),
  biggestChallenge: z.string().max(500).optional().or(z.literal("")),
  previousPrograms: z.string().max(500).optional().or(z.literal("")),
  preferredProgram: z.string().optional().or(z.literal("")),
  preferredTrainer: z.string().optional().or(z.literal("")),
  additionalMessage: z.string().max(2000).optional().or(z.literal("")),
});

export const consultationSchema = z.object({
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  consultationType: z.enum(["In person", "Phone call", "Google Meet", "WhatsApp call"]),
  preferredBranch: z.string().min(1),
  preferredTrainerBooking: z.string().optional().or(z.literal("")),
});

export const consentSchema = z.object({
  privacyAccepted: z.boolean().refine((v) => v === true),
  contactConsent: z.boolean().refine((v) => v === true),
  medicalDisclaimer: z.boolean().refine((v) => v === true),
  marketingConsent: z.boolean(),
  turnstileToken: z.string().optional(),
});

export const registrationSchema = personalInfoSchema
  .merge(fitnessInfoSchema)
  .merge(goalsSchema)
  .merge(consultationSchema)
  .merge(consentSchema)
  .extend({
    leadSource: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: requiredTrimmed("Name", 2),
  email: requiredEmail,
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[\d\s+\-()]{7,20}$/, "Enter a valid phone number (7–20 characters)"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
  privacyAccepted: z
    .boolean()
    .refine((v) => v === true, { message: "You must accept the privacy policy" }),
});

export const bookingSchema = z.object({
  name: requiredTrimmed("Full name", 2),
  email: requiredEmail,
  phone: requiredPhoneDigits("Phone"),
  trainerSlug: z.string().trim().min(1, "Please select a trainer"),
  consultationType: z.enum(["In person", "Phone call", "Google Meet", "WhatsApp call"], {
    message: "Please select consultation type",
  }),
  date: z.string().trim().min(1, "Please select a date"),
  time: z.string().trim().min(1, "Please select a time"),
  program: z.string().optional(),
  branch: z.string().trim().min(1, "Please select a branch"),
  notes: z.string().max(1000, "Notes are too long (max 1000 characters)").optional(),
  timezone: z.string().optional(),
});

export const adminLoginSchema = z.object({
  username: requiredTrimmed("Username"),
  password: z.string().min(1, "Password is required"),
});

export const classRegistrationSchema = z.object({
  classId: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  waitlist: z.boolean().optional(),
});

export const leadStatuses = [
  "New",
  "Contacted",
  "Consultation Scheduled",
  "Consultation Completed",
  "Trial Scheduled",
  "Joined",
  "Not Interested",
  "Follow Up",
  "Closed",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const PROFESSION_OPTIONS = [
  "IT/software Professional",
  "Working",
  "Doctor",
  "Business",
  "Housewife",
  "Student",
  "Other",
] as const;

export const PRIMARY_GOAL_OPTIONS = [
  "Fat Loss",
  "Muscle Gain",
  "Fix Health / PCOD / Thyroid",
  "General Fitness",
] as const;

export const EXPERIENCE_OPTIONS = [
  "Complete Beginner",
  "Tried a Few Programs",
  "Regular for Years",
  "Ex-Athlete / Advanced",
] as const;

export const PREVIOUS_PROGRAM_OPTIONS = [
  "Gym / Personal Trainer",
  "Diet Apps",
  "Keto / Low Carb",
  "Intermittent Fasting",
  "Online Coaching",
  "YouTube / Self-guided",
  "None",
] as const;

export const START_TIMING_OPTIONS = [
  "Immediately",
  "This Month",
  "Next Month",
  "Just Exploring",
] as const;

export const TIME_SLOT_OPTIONS = [
  "9:00 AM to 11:00 AM",
  "11:00 AM to 1:00 PM",
  "2:00 PM to 4:00 PM",
  "4:00 PM to 6:00 PM",
  "6:00 PM to 8:00 PM",
] as const;

export const DAILY_TIME_OPTIONS = [
  "Less than 20 min",
  "20–30 min",
  "30–45 min",
  "45–60 min",
  "60+ min",
] as const;
