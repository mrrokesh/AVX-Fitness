export type ClassSession = {
  id: string;
  name: string;
  trainer: string;
  trainerSlug: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  branch: string;
  capacity: number;
  booked: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  mode: "In person" | "Online";
  programSlug?: string;
};

/** Sample schedule — replace with live admin-managed classes */
export const classSchedule: ClassSession[] = [
  {
    id: "c1",
    name: "Morning Strength",
    trainer: "Kathir",
    trainerSlug: "kathir",
    date: getOffsetDate(1),
    startTime: "07:00",
    endTime: "08:00",
    durationMinutes: 60,
    branch: "Salem Studio",
    capacity: 12,
    booked: 8,
    difficulty: "Intermediate",
    category: "Strength",
    mode: "In person",
    programSlug: "muscle-building",
  },
  {
    id: "c2",
    name: "HIIT Express",
    trainer: "Kathir",
    trainerSlug: "kathir",
    date: getOffsetDate(1),
    startTime: "18:30",
    endTime: "19:15",
    durationMinutes: 45,
    branch: "Salem Studio",
    capacity: 16,
    booked: 16,
    difficulty: "Advanced",
    category: "Conditioning",
    mode: "In person",
    programSlug: "weight-loss",
  },
  {
    id: "c3",
    name: "Beginner Foundations",
    trainer: "Kathir",
    trainerSlug: "kathir",
    date: getOffsetDate(2),
    startTime: "10:00",
    endTime: "11:00",
    durationMinutes: 60,
    branch: "Salem Studio",
    capacity: 10,
    booked: 4,
    difficulty: "Beginner",
    category: "Beginner",
    mode: "In person",
    programSlug: "body-recomposition",
  },
  {
    id: "c4",
    name: "Functional Flow",
    trainer: "Kathir",
    trainerSlug: "kathir",
    date: getOffsetDate(2),
    startTime: "17:00",
    endTime: "18:00",
    durationMinutes: 60,
    branch: "Salem Studio",
    capacity: 14,
    booked: 9,
    difficulty: "Intermediate",
    category: "Functional",
    mode: "In person",
    programSlug: "body-recomposition",
  },
  {
    id: "c5",
    name: "Online Coaching Check-in",
    trainer: "Kathir",
    trainerSlug: "kathir",
    date: getOffsetDate(3),
    startTime: "12:00",
    endTime: "12:30",
    durationMinutes: 30,
    branch: "Online",
    capacity: 8,
    booked: 3,
    difficulty: "Beginner",
    category: "Online",
    mode: "Online",
    programSlug: "weight-loss",
  },
  {
    id: "c6",
    name: "Women’s Strength",
    trainer: "Kathir",
    trainerSlug: "kathir",
    date: getOffsetDate(4),
    startTime: "19:00",
    endTime: "20:00",
    durationMinutes: 60,
    branch: "Salem Studio",
    capacity: 12,
    booked: 7,
    difficulty: "Beginner",
    category: "Women",
    mode: "In person",
    programSlug: "muscle-building",
  },
  {
    id: "c7",
    name: "Hypertrophy Lab",
    trainer: "Kathir",
    trainerSlug: "kathir",
    date: getOffsetDate(5),
    startTime: "08:00",
    endTime: "09:15",
    durationMinutes: 75,
    branch: "Salem Studio",
    capacity: 10,
    booked: 6,
    difficulty: "Advanced",
    category: "Muscle",
    mode: "In person",
    programSlug: "muscle-building",
  },
];

function getOffsetDate(daysFromToday: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().slice(0, 10);
}

export type ConsultationSlot = {
  date: string;
  times: string[];
};

export function getConsultationSlots(days = 14): ConsultationSlot[] {
  const slots: ConsultationSlot[] = [];
  const times = ["09:00", "10:30", "12:00", "15:00", "17:00", "18:30"];
  for (let i = 1; i <= days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0) continue; // closed Sundays in sample
    const available = times.filter((_, idx) => (i + idx) % 3 !== 0);
    if (available.length) {
      slots.push({ date: d.toISOString().slice(0, 10), times: available });
    }
  }
  return slots;
}
