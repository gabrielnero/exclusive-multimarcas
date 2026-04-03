import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🧹 Limpando blob URLs inválidas do banco...");

  const vehicles = await prisma.vehicle.findMany({
    select: { id: true, modelo: true, imagens: true },
  });

  let cleaned = 0;

  for (const vehicle of vehicles) {
    const validImages = vehicle.imagens.filter(
      (url) => !url.startsWith("blob:") && url.trim() !== ""
    );

    if (validImages.length !== vehicle.imagens.length) {
      await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { imagens: validImages },
      });
      const removed = vehicle.imagens.length - validImages.length;
      console.log(`  ✓ ${vehicle.modelo}: removidas ${removed} URL(s) inválidas`);
      cleaned++;
    }
  }

  if (cleaned === 0) {
    console.log("  ℹ️  Nenhuma URL inválida encontrada.");
  } else {
    console.log(`\n✅ ${cleaned} veículo(s) corrigidos.`);
  }
  console.log("Agora faça o upload das fotos novamente no painel admin.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
