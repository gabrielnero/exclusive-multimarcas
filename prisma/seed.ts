import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  // Admin user
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

  // Settings with real data
  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {
      nomeLoja: "Exclusive Multimarcas",
      descricao: "Sua revenda de confiança em Marau - RS. Mais de 18 anos no mercado com qualidade, transparência e os melhores veículos seminovos.",
      whatsapp: "5554334286811",
      endereco: "Marau – RS",
      instagram: "https://instagram.com/exclusivemarau",
      facebook: "",
      seoTitle: "Exclusive Multimarcas | Veículos Seminovos em Marau - RS",
      seoDesc: "Sua revenda de confiança em Marau - RS. Seminovos com procedência garantida, financiamento facilitado e 18 anos de experiência.",
    },
    create: {
      id: "singleton",
      nomeLoja: "Exclusive Multimarcas",
      descricao: "Sua revenda de confiança em Marau - RS. Mais de 18 anos no mercado com qualidade, transparência e os melhores veículos seminovos.",
      whatsapp: "5554334286811",
      endereco: "Marau – RS",
      instagram: "https://instagram.com/exclusivemarau",
      facebook: "",
      seoTitle: "Exclusive Multimarcas | Veículos Seminovos em Marau - RS",
      seoDesc: "Sua revenda de confiança em Marau - RS. Seminovos com procedência garantida, financiamento facilitado e 18 anos de experiência.",
    },
  });

  // Delete mock leads created by previous seed
  await prisma.lead.deleteMany({
    where: {
      telefone: { in: ["(54) 99111-2222", "(54) 98222-3333", "(54) 97333-4444"] },
    },
  });
  console.log("🗑️  Leads mock removidos");

  // Seed vehicles only if DB is empty
  const vehicleCount = await prisma.vehicle.count();
  if (vehicleCount === 0) {
    console.log("🚗 Adicionando veículos reais...");
    await prisma.vehicle.createMany({
      data: [
        {
          marca: "Volkswagen",
          modelo: "SpaceFox",
          versao: "1.6 Completa",
          ano: 2009,
          preco: 32900,
          km: 0,
          combustivel: "Flex",
          cambio: "Manual",
          cor: "A confirmar",
          tipo: "Hatch",
          destaque: false,
          oferta: true,
          vendido: false,
          opcionais: ["Ar-condicionado", "Direção hidráulica", "Vidros elétricos", "Travas elétricas", "Alarme", "Manual do proprietário", "Chave reserva", "IPVA 2026 pago"],
          descricao: "Volkswagen SpaceFox 1.6 Completo em estado impecável. Veículo de único dono, com manual do proprietário e chave reserva — raridade no mercado. IPVA 2026 totalmente quitado. Interior e exterior sem detalhes, revisões realizadas com regularidade. Excelente opção para família que busca praticidade, espaço e confiabilidade com custo-benefício imbatível.",
          imagens: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80"],
        },
        {
          marca: "Chevrolet",
          modelo: "Cruze",
          versao: "LTZ II 1.4 Turbo",
          ano: 2019,
          preco: 68900,
          km: 0,
          combustivel: "Flex",
          cambio: "Automático",
          cor: "A confirmar",
          tipo: "Sedan",
          destaque: true,
          oferta: false,
          vendido: false,
          opcionais: ["Câmbio automático 6 marchas", "Bancos em couro", "Pneus Pirelli novos", "Central multimídia", "Câmera de ré", "Sensor de estacionamento", "Ar-condicionado digital", "Faróis LED", "Keyless Entry"],
          descricao: "Chevrolet Cruze LTZ II câmbio automático de 6 marchas — a versão mais completa da linha. Equipado com bancos em couro, central multimídia com câmera de ré e pneus Pirelli novos. Veículo em excelente estado de conservação, revisado e pronto para transferência. Sedan executivo com desempenho, conforto e tecnologia para quem exige o melhor.",
          imagens: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"],
        },
        {
          marca: "Ford",
          modelo: "Ka",
          versao: "Trail 1.5",
          ano: 2022,
          preco: 51900,
          km: 0,
          combustivel: "Flex",
          cambio: "Manual",
          cor: "A confirmar",
          tipo: "Hatch",
          destaque: true,
          oferta: false,
          vendido: false,
          opcionais: ["Bancos em couro", "Rodas grafite exclusivas", "Farol máscara negra", "Ar-condicionado", "Direção elétrica", "Vidros elétricos", "Central multimídia", "Bluetooth"],
          descricao: "Ford Ka Trail 1.5 na versão especial com visual esportivo e off-road. Bancos revestidos em couro, rodas grafite exclusivas e farol máscara negra conferem personalidade única ao veículo. Totalmente equipado, combinando esportividade e praticidade. Ideal para quem busca estilo diferenciado no segmento hatch com desempenho acima da média.",
          imagens: ["https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80"],
        },
        {
          marca: "Volkswagen",
          modelo: "T-Cross",
          versao: "1.0 TSI Turbo Completa",
          ano: 2020,
          preco: 94400,
          km: 0,
          combustivel: "Flex",
          cambio: "Automático",
          cor: "A confirmar",
          tipo: "SUV",
          destaque: true,
          oferta: false,
          vendido: false,
          opcionais: ["Motor 1.0 TSI Turbo", "Câmbio automático", "Central multimídia VW Play", "Câmera de ré", "Sensor de estacionamento", "Faróis LED", "Keyless Entry", "Controle de cruzeiro", "Rodas 17\" Diamond Cut"],
          descricao: "Volkswagen T-Cross 2020 1.0 TSI Turbo na versão completa — o SUV compacto mais desejado do Brasil. Motor turbo econômico aliado a câmbio automático suave e todos os equipamentos de série da versão top. Veículo bem conservado com histórico de revisões. Para quem busca modernidade, tecnologia e a praticidade de um SUV urbano.",
          imagens: ["https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80"],
        },
        {
          marca: "Fiat",
          modelo: "Palio",
          versao: "Celebration 1.0",
          ano: 2013,
          preco: 32900,
          km: 0,
          combustivel: "Flex",
          cambio: "Manual",
          cor: "A confirmar",
          tipo: "Hatch",
          destaque: false,
          oferta: true,
          vendido: false,
          opcionais: ["Ar-condicionado", "Direção hidráulica", "Vidros elétricos", "Travas elétricas", "Desembaçador traseiro", "Limpador traseiro", "Alarme"],
          descricao: "Fiat Palio Celebration 1.0 completo com ar-condicionado, direção hidráulica, vidros e travas elétricas, desembaçador traseiro e alarme. Veículo econômico, confiável e muito bem cuidado. Excelente opção de entrada para quem busca um carro completo com baixo custo de manutenção e consumo eficiente no dia a dia.",
          imagens: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"],
        },
        {
          marca: "Fiat",
          modelo: "Palio",
          versao: "Attractive 1.0",
          ano: 2014,
          preco: 32900,
          km: 0,
          combustivel: "Flex",
          cambio: "Manual",
          cor: "A confirmar",
          tipo: "Hatch",
          destaque: false,
          oferta: false,
          vendido: false,
          opcionais: ["Direção hidráulica", "Vidros elétricos", "Travas elétricas", "Desembaçador traseiro", "Limpador traseiro", "Ar quente"],
          descricao: "Fiat Palio Attractive 1.0 com direção hidráulica, vidros e travas elétricas, desembaçador e limpador traseiro. Veículo compacto, econômico e de baixo custo de manutenção. Perfeito para quem precisa de mobilidade urbana com praticidade e eficiência. Documentação em dia e pronto para transferência imediata.",
          imagens: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"],
        },
        {
          marca: "Volkswagen",
          modelo: "Virtus",
          versao: "TSI 1.0 Turbo Completo",
          ano: 2022,
          preco: 79900,
          km: 0,
          combustivel: "Flex",
          cambio: "Automático",
          cor: "A confirmar",
          tipo: "Sedan",
          destaque: true,
          oferta: false,
          vendido: false,
          opcionais: ["Motor 1.0 TSI Turbo", "Câmbio automático", "Central multimídia", "Câmera de ré", "Sensor de estacionamento", "Faróis LED", "Keyless Entry", "Controle de cruzeiro adaptativo", "Bancos em couro"],
          descricao: "Volkswagen Virtus TSI 1.0 Turbo completo — o sedan mais moderno do segmento. Motor turbo de alta eficiência com câmbio automático de resposta imediata. Equipado com todos os itens da versão top: multimídia, câmera de ré, faróis LED e keyless entry. Sofisticação e desempenho para quem valoriza tecnologia e elegância em cada detalhe.",
          imagens: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"],
        },
        {
          marca: "Hyundai",
          modelo: "HB20",
          versao: "Comfort 1.0",
          ano: 2018,
          preco: 0,
          km: 0,
          combustivel: "Flex",
          cambio: "Manual",
          cor: "A confirmar",
          tipo: "Hatch",
          destaque: false,
          oferta: false,
          vendido: false,
          opcionais: ["Ar-condicionado", "Direção elétrica", "Vidros elétricos", "Travas elétricas", "Rádio com Bluetooth", "Computador de bordo"],
          descricao: "Hyundai HB20 Comfort 1.0 ano 2018, hatch compacto com acabamento de qualidade e itens essenciais de conforto. Veículo revisado, em ótimo estado de conservação, com baixo custo de manutenção e consumo eficiente. Uma escolha inteligente para quem busca confiabilidade e praticidade no dia a dia urbano.",
          imagens: ["https://images.unsplash.com/photo-1596308564799-04c72ef2b3ae?w=800&q=80"],
        },
        {
          marca: "Volkswagen",
          modelo: "Fox",
          versao: "Trend 1.0",
          ano: 2017,
          preco: 0,
          km: 0,
          combustivel: "Flex",
          cambio: "Manual",
          cor: "A confirmar",
          tipo: "Hatch",
          destaque: false,
          oferta: false,
          vendido: false,
          opcionais: ["Som original de fábrica", "Ar-condicionado", "Direção hidráulica", "Vidros elétricos", "Travas elétricas", "Computador de bordo"],
          descricao: "Volkswagen Fox Trend 1.0 ano 2017 com som original de fábrica. Veículo econômico, confiável e muito bem conservado. O Fox é reconhecido pela sua robustez e baixo custo de manutenção — uma escolha sólida para uso diário. Documentação em dia, pronto para transferência imediata.",
          imagens: ["https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80"],
        },
      ],
    });
    console.log("✅ 9 veículos adicionados com sucesso!");
  } else {
    console.log(`ℹ️  Banco já possui ${vehicleCount} veículo(s), pulando criação de veículos.`);
  }

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
