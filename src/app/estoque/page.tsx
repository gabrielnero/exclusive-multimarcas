import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import EstoqueClient from "@/components/EstoqueClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Estoque | Exclusive Multimarcas",
  description:
    "Confira nosso estoque completo de veículos seminovos em Marau - RS. Volkswagen, Chevrolet, Fiat, Ford, Hyundai e muito mais. Financiamento facilitado.",
};

export default async function EstoquePage() {
  const vehicles = await prisma.vehicle.findMany({
    where: { vendido: false },
    orderBy: [{ destaque: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      marca: true,
      modelo: true,
      versao: true,
      ano: true,
      preco: true,
      km: true,
      combustivel: true,
      cambio: true,
      cor: true,
      tipo: true,
      descricao: true,
      opcionais: true,
      imagens: true,
      destaque: true,
      oferta: true,
      vendido: true,
    },
  });

  return <EstoqueClient vehicles={vehicles} />;
}
