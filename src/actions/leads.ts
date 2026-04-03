"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";
import { auth } from "@/auth";

export async function getLeads(status?: "novo" | "atendido") {
  const session = await auth();
  if (!session) throw new Error("Não autorizado");

  return prisma.lead.findMany({
    where: status ? { status } : undefined,
    include: { vehicle: { select: { marca: true, modelo: true, ano: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateLeadStatus(id: string, status: "novo" | "atendido") {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function deleteLead(id: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function createLead(data: {
  nome: string;
  telefone: string;
  mensagem?: string;
  vehicleId?: string;
}) {
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await prisma.lead.create({ data: parsed.data });
    return { success: true };
  } catch {
    return { error: "Erro ao salvar contato" };
  }
}
