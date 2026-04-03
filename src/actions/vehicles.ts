"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { vehicleSchema, type VehicleInput } from "@/lib/validations";
import { auth } from "@/auth";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Não autorizado");
}

export async function getVehicles(params?: {
  search?: string;
  status?: "all" | "available" | "sold";
  tipo?: string;
  marca?: string;
}) {
  await requireAuth();

  const where: Record<string, unknown> = {};

  if (params?.search) {
    where.OR = [
      { marca: { contains: params.search, mode: "insensitive" } },
      { modelo: { contains: params.search, mode: "insensitive" } },
      { versao: { contains: params.search, mode: "insensitive" } },
      { cor: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params?.status === "available") where.vendido = false;
  if (params?.status === "sold") where.vendido = true;
  if (params?.tipo) where.tipo = params.tipo;
  if (params?.marca) where.marca = params.marca;

  return prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { leads: true } } },
  });
}

export async function getVehicleById(id: string) {
  await requireAuth();
  return prisma.vehicle.findUnique({ where: { id } });
}

export async function createVehicle(data: VehicleInput) {
  await requireAuth();

  const parsed = vehicleSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const vehicle = await prisma.vehicle.create({ data: parsed.data });
    revalidatePath("/admin/veiculos");
    revalidatePath("/estoque");
    return { success: true, id: vehicle.id };
  } catch {
    return { error: "Erro ao criar veículo" };
  }
}

export async function updateVehicle(id: string, data: VehicleInput) {
  await requireAuth();

  const parsed = vehicleSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await prisma.vehicle.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/veiculos");
    revalidatePath(`/admin/veiculos/${id}`);
    revalidatePath("/estoque");
    revalidatePath(`/veiculo/${id}`);
    return { success: true };
  } catch {
    return { error: "Erro ao atualizar veículo" };
  }
}

export async function deleteVehicle(id: string) {
  await requireAuth();
  try {
    await prisma.vehicle.delete({ where: { id } });
    revalidatePath("/admin/veiculos");
    revalidatePath("/estoque");
    return { success: true };
  } catch {
    return { error: "Erro ao excluir veículo" };
  }
}

export async function toggleVehicleSold(id: string, vendido: boolean) {
  await requireAuth();
  await prisma.vehicle.update({ where: { id }, data: { vendido } });
  revalidatePath("/admin/veiculos");
  revalidatePath("/estoque");
  return { success: true };
}

export async function toggleVehicleDestaque(id: string, destaque: boolean) {
  await requireAuth();
  await prisma.vehicle.update({ where: { id }, data: { destaque } });
  revalidatePath("/admin/veiculos");
  revalidatePath("/");
  return { success: true };
}

export async function toggleVehicleOferta(id: string, oferta: boolean) {
  await requireAuth();
  await prisma.vehicle.update({ where: { id }, data: { oferta } });
  revalidatePath("/admin/veiculos");
  revalidatePath("/estoque");
  return { success: true };
}

export async function duplicateVehicle(id: string) {
  await requireAuth();
  const original = await prisma.vehicle.findUnique({ where: { id } });
  if (!original) return { error: "Veículo não encontrado" };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, createdAt: _c, updatedAt: _u, leads: _l, ...data } = original as typeof original & { leads?: unknown[] };

  const newVehicle = await prisma.vehicle.create({
    data: {
      ...data,
      modelo: `${original.modelo} (cópia)`,
      vendido: false,
    },
  });

  revalidatePath("/admin/veiculos");
  return { success: true, id: newVehicle.id };
}

export async function getDashboardStats() {
  await requireAuth();

  const [totalVehicles, soldVehicles, totalLeads, newLeads, featuredVehicles] =
    await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { vendido: true } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "novo" } }),
      prisma.vehicle.count({ where: { destaque: true } }),
    ]);

  return { totalVehicles, soldVehicles, totalLeads, newLeads, featuredVehicles };
}
