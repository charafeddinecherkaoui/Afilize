import { NextResponse } from "next/server";
import { createWaitlistItem } from "@/lib/monday";

const ROLES = new Set(["Advertiser", "Publisher", "Agency", "Network", "Other"]);
const SIZES = new Set(["1–10", "11–50", "51–200", "201–1 000", "1 000+"]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      company?: string;
      role?: string;
      size?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const company = body.company?.trim();
    const role = body.role?.trim();
    const size = body.size?.trim();
    const message = body.message?.trim() ?? "";

    if (!name || !email || !company || !role) {
      return NextResponse.json(
        { error: "Name, email, company, and role are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid work email." },
        { status: 400 },
      );
    }

    if (!ROLES.has(role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }

    if (size && !SIZES.has(size)) {
      return NextResponse.json({ error: "Invalid team size." }, { status: 400 });
    }

    const item = await createWaitlistItem({
      name,
      email,
      company,
      role,
      size: size || undefined,
      message,
    });

    return NextResponse.json({ ok: true, id: item.id });
  } catch (error) {
    console.error("Waitlist submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your waitlist request right now." },
      { status: 500 },
    );
  }
}
