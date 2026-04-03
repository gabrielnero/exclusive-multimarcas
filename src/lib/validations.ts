import { z } from "zod";

export const vehicleSchema = z.object({
  marca: z.string().min(1, "Marca é obrigatória"),
  modelo: z.string().min(1, "Modelo é obrigatório"),
  versao: z.string().optional().default(""),
  ano: z.coerce.number().min(1990).max(new Date().getFullYear() + 1),
  preco: z.coerce.number().min(1, "Preço é obrigatório"),
  km: z.coerce.number().min(0),
  combustivel: z.enum(["Flex", "Gasolina", "Diesel", "Elétrico", "Híbrido"]),
  cambio: z.enum(["Manual", "Automático", "CVT", "Automatizado"]),
  cor: z.string().min(1, "Cor é obrigatória"),
  tipo: z.enum(["SUV", "Sedan", "Hatch", "Pickup", "Minivan", "Esportivo"]),
  descricao: z.string().optional().default(""),
  opcionais: z.array(z.string()).default([]),
  imagens: z.array(z.string().url("URL inválida")).default([]),
  destaque: z.boolean().default(false),
  oferta: z.boolean().default(false),
});

export const leadSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  telefone: z.string().min(8, "Telefone é obrigatório"),
  mensagem: z.string().optional().default(""),
  vehicleId: z.string().optional(),
});

export const settingsSchema = z.object({
  nomeLoja: z.string().min(1),
  descricao: z.string().optional().default(""),
  whatsapp: z.string().optional().default(""),
  endereco: z.string().optional().default(""),
  instagram: z.string().optional().default(""),
  facebook: z.string().optional().default(""),
  seoTitle: z.string().optional().default(""),
  seoDesc: z.string().optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
