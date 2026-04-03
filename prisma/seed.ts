import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@exclusive.com" },
    update: {},
    create: {
      email: "admin@exclusive.com",
      password: hashedPassword,
      name: "Administrador",
    },
  });

  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      nomeLoja: "Exclusive Multimarcas",
      descricao: "Sua revenda de confiança em Marau - RS. Qualidade, transparência e os melhores veículos para você.",
      whatsapp: "5554999999999",
      endereco: "Rua das Acácias, 1234 – Centro, Marau – RS, 99150-000",
      instagram: "https://instagram.com/exclusivemultimarcas",
      facebook: "https://facebook.com/exclusivemultimarcas",
      seoTitle: "Exclusive Multimarcas | Veículos Seminovos em Marau - RS",
      seoDesc: "Revenda de veículos seminovos em Marau - RS. Financiamento facilitado, troca avaliada e procedência garantida.",
    },
  });

  // Seed some leads for demo
  const vehicle = await prisma.vehicle.findFirst();

  await prisma.lead.createMany({
    data: [
      {
        nome: "João Silva",
        telefone: "(54) 99111-2222",
        mensagem: "Tenho interesse no Corolla. Qual o valor do financiamento?",
        vehicleId: vehicle?.id ?? null,
        status: "novo",
      },
      {
        nome: "Maria Santos",
        telefone: "(54) 98222-3333",
        mensagem: "Gostaria de agendar uma visita para ver o HR-V.",
        status: "atendido",
      },
      {
        nome: "Carlos Oliveira",
        telefone: "(54) 97333-4444",
        mensagem: "Quero fazer uma avaliação do meu carro para troca.",
        vehicleId: vehicle?.id ?? null,
        status: "novo",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed concluído!");
  console.log("📧 Login: admin@exclusive.com");
  console.log("🔑 Senha: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
