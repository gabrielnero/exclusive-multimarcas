import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({ data: parsed.data });
    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
