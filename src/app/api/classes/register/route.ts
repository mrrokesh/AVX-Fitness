import { NextRequest, NextResponse } from "next/server";
import { classRegistrationSchema } from "@/lib/validations/registration";
import { classSchedule } from "@/data/schedule";
import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const isServerless =
  Boolean(process.env.VERCEL) || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

const FILE = isServerless
  ? path.join("/tmp", "avx-fitness", "store", "class-regs.json")
  : path.join(process.cwd(), "data", "store", "class-regs.json");

type ClassReg = {
  id: string;
  classId: string;
  name: string;
  email: string;
  phone: string;
  waitlist: boolean;
  createdAt: string;
};

let memoryRegs: ClassReg[] | null = null;

async function readRegs(): Promise<ClassReg[]> {
  if (memoryRegs) return memoryRegs;
  try {
    memoryRegs = JSON.parse(await fs.readFile(FILE, "utf8")) as ClassReg[];
    return memoryRegs;
  } catch {
    memoryRegs = [];
    return memoryRegs;
  }
}

async function writeRegs(rows: ClassReg[]) {
  memoryRegs = rows;
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(rows, null, 2));
  } catch (err) {
    console.warn(
      "[class-regs] Disk write skipped:",
      err instanceof Error ? err.message : err
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = classRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const session = classSchedule.find((c) => c.id === parsed.data.classId);
  if (!session) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  const seats = session.capacity - session.booked;
  const waitlist = parsed.data.waitlist || seats <= 0;
  if (seats <= 0 && !waitlist) {
    return NextResponse.json(
      { error: "Class is full. Join the waitlist.", waitlistAvailable: true },
      { status: 409 }
    );
  }

  const rows = await readRegs();
  const record: ClassReg = {
    id: `CR-${nanoid(8).toUpperCase()}`,
    classId: parsed.data.classId,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    waitlist,
    createdAt: new Date().toISOString(),
  };
  rows.unshift(record);
  await writeRegs(rows);

  return NextResponse.json({
    ok: true,
    id: record.id,
    waitlist,
    remainingSeats: Math.max(0, seats - (waitlist ? 0 : 1)),
  });
}
