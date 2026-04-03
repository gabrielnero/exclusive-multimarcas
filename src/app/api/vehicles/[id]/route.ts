import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      return NextResponse.json({ error: "Veículo não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ vehicle });
  } catch {
    return NextResponse.json({ error: "Erro ao buscar veículo" }, { status: 500 });
  }
}
