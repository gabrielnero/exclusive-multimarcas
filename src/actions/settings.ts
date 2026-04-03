"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { settingsSchema, type SettingsInput } from "@/lib/validations";
import { auth } from "@/auth";

export async function getSettings() {
  return prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      nomeLoja: "Exclusive Multimarcas",
      whatsapp: "5554999999999",
      endereco: "Rua das Acácias, 1234 – Centro, Marau – RS",
    },
  });
}

export async function updateSettings(data: SettingsInput) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  const parsed = settingsSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await prisma.settings.upsert({
      where: { id: "singleton" },
      update: parsed.data,
      create: { id: "singleton", ...parsed.data },
    });
    revalidatePath("/admin/configuracoes");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Erro ao salvar configurações" };
  }
}
