import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destaque = searchParams.get("destaque");
  const limit = searchParams.get("limit");
  const tipo = searchParams.get("tipo");
  const marca = searchParams.get("marca");

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        vendido: false,
        ...(destaque === "true" ? { destaque: true } : {}),
        ...(tipo ? { tipo } : {}),
        ...(marca ? { marca } : {}),
      },
      orderBy: [{ destaque: "desc" }, { createdAt: "desc" }],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({ vehicles });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar veículos" },
      { status: 500 }
    );
  }
}
