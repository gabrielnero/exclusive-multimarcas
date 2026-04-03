import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatKm } from "@/utils/format";
import { getVehicleWhatsAppLink } from "@/utils/whatsapp";
import VehicleGallery from "@/components/VehicleGallery";
import FinancingSimulator from "@/components/FinancingSimulator";
import VehicleCard from "@/components/VehicleCard";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) return { title: "Veículo não encontrado" };

  return {
    title: `${vehicle.marca} ${vehicle.modelo} ${vehicle.ano}${vehicle.preco > 0 ? ` - ${formatCurrency(vehicle.preco)}` : ""}`,
    description: `${vehicle.marca} ${vehicle.modelo} ${vehicle.versao} ${vehicle.ano}, ${vehicle.combustivel}, ${vehicle.cambio}. ${vehicle.descricao.slice(0, 120)}...`,
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
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

  if (!vehicle) notFound();

  const similar = await prisma.vehicle.findMany({
    where: {
      id: { not: id },
      vendido: false,
      OR: [{ tipo: vehicle.tipo }, { marca: vehicle.marca }],
    },
    take: 3,
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

  const whatsappLink = getVehicleWhatsAppLink(vehicle.marca, vehicle.modelo, vehicle.ano, vehicle.id);
  const isConsulte = vehicle.preco === 0;

  const specs = [
    { icon: <Calendar size={16} />, label: "Ano", value: vehicle.ano.toString() },
    ...(vehicle.km > 0 ? [{ icon: <Gauge size={16} />, label: "Quilometragem", value: formatKm(vehicle.km) }] : []),
    { icon: <Fuel size={16} />, label: "Combustível", value: vehicle.combustivel },
    { icon: <Settings size={16} />, label: "Câmbio", value: vehicle.cambio },
    { icon: <Palette size={16} />, label: "Cor", value: vehicle.cor },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-zinc-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-zinc-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">Início</Link>
          <ChevronRight size={14} />
          <Link href="/estoque" className="hover:text-orange-500 transition-colors">Estoque</Link>
          <ChevronRight size={14} />
          <span className="text-zinc-700 font-medium">{vehicle.marca} {vehicle.modelo}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back */}
        <Link href="/estoque" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
          <ArrowLeft size={16} /> Voltar ao estoque
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <VehicleGallery images={vehicle.imagens} alt={`${vehicle.marca} ${vehicle.modelo}`} />

            {/* Vehicle Info */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-100">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {vehicle.oferta && (
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">🔥 Oferta</span>
                    )}
                    {vehicle.destaque && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">⭐ Destaque</span>
                    )}
                    <span className="bg-zinc-100 text-zinc-600 text-xs font-medium px-2.5 py-1 rounded-full">{vehicle.tipo}</span>
                  </div>
                  <p className="text-zinc-400 text-sm uppercase tracking-widest font-semibold">{vehicle.marca}</p>
                  <h1 className="text-2xl md:text-3xl font-black text-zinc-900">
                    {vehicle.modelo}
                  </h1>
                  <p className="text-zinc-500 font-medium">{vehicle.versao}</p>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {specs.map(({ icon, label, value }) => (
                  <div key={label} className="bg-zinc-50 rounded-xl p-3 flex items-center gap-2.5">
                    <span className="text-orange-500">{icon}</span>
                    <div>
                      <p className="text-xs text-zinc-400">{label}</p>
                      <p className="font-semibold text-zinc-800 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {vehicle.descricao && (
              <div className="bg-white rounded-2xl p-6 border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-lg mb-3">Sobre este veículo</h2>
                <p className="text-zinc-600 leading-relaxed">{vehicle.descricao}</p>
              </div>
            )}

            {/* Opcionais */}
            {vehicle.opcionais.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-lg mb-4">Opcionais e Equipamentos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.opcionais.map((op) => (
                    <div key={op} className="flex items-center gap-2 text-sm text-zinc-700">
                      <CheckCircle size={15} className="text-green-500 shrink-0" />
                      {op}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Price + Actions */}
          <div className="space-y-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
              {isConsulte ? (
                <>
                  <p className="text-zinc-400 text-sm">Valor</p>
                  <p className="text-orange-500 font-black text-3xl leading-tight">Consulte</p>
                  <p className="text-zinc-400 text-xs mt-1">financiamento disponível</p>
                </>
              ) : (
                <>
                  <p className="text-zinc-400 text-sm">Preço à vista</p>
                  <p className="text-orange-600 font-black text-3xl leading-tight">
                    {formatCurrency(vehicle.preco)}
                  </p>
                  <p className="text-zinc-400 text-xs mt-1">ou financie em até 60x</p>
                </>
              )}

              <div className="mt-5 space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chamar no WhatsApp
                </a>
                <Link
                  href="/contato"
                  className="flex items-center justify-center w-full border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 font-bold py-3 rounded-xl transition-all"
                >
                  Solicitar contato
                </Link>
              </div>
            </div>

            {/* Financing simulator (only if has price) */}
            {!isConsulte && <FinancingSimulator preco={vehicle.preco} />}

            {/* Trust badges */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-100">
              <h3 className="font-semibold text-zinc-800 text-sm mb-3">Por que comprar aqui?</h3>
              <ul className="space-y-2">
                {[
                  "✅ Procedência verificada",
                  "✅ Documentação em dia",
                  "✅ Financiamento facilitado",
                  "✅ Aceitamos troca",
                  "✅ 18 anos no mercado",
                ].map((item) => (
                  <li key={item} className="text-xs text-zinc-600">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-zinc-900">Veículos Similares</h2>
              <Link href="/estoque" className="text-sm text-zinc-500 hover:text-orange-500 flex items-center gap-1">
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
