import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CreditCard,
  RefreshCw,
  Star,
  ChevronRight,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
import { getWhatsAppLink } from "@/utils/whatsapp";

const destaques = vehicles.filter((v) => v.destaque).slice(0, 6);

const depoimentos = [
  {
    nome: "Carlos Eduardo S.",
    texto:
      "Comprei meu Toyota Corolla aqui e foi uma experiência incrível. Atendimento top, transparência total e o carro em perfeito estado. Super indico!",
    nota: 5,
    veiculo: "Toyota Corolla 2023",
  },
  {
    nome: "Ana Paula R.",
    texto:
      "Fizeram a avaliação do meu carro de forma justa e o financiamento foi aprovado rapidinho. Equipe muito atenciosa e profissional.",
    nota: 5,
    veiculo: "Jeep Compass 2022",
  },
  {
    nome: "Rodrigo M.",
    texto:
      "Já é meu terceiro carro comprado na Exclusive. Sempre com procedência garantida e preço justo. Confiança total!",
    nota: 5,
    veiculo: "Ford Ranger 2021",
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-zinc-950 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80"
            alt="Veículos premium"
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              ✦ Marau - RS
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6">
              Seu próximo carro
              <span className="block text-yellow-400">está aqui.</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Seminovos de qualidade com procedência garantida, financiamento facilitado
              e a melhor avaliação do seu usado em Marau e região.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/estoque"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black text-base px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-yellow-500/20"
              >
                Ver Estoque Completo <ArrowRight size={18} />
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base px-8 py-4 rounded-full transition-all backdrop-blur-sm"
              >
                Falar com consultor
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[["+500", "Veículos vendidos"], ["10+", "Anos de mercado"], ["4.9★", "Avaliação média"]].map(
                ([num, label]) => (
                  <div key={label}>
                    <p className="text-yellow-400 font-black text-2xl">{num}</p>
                    <p className="text-zinc-400 text-xs">{label}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-0.5 h-10 bg-gradient-to-b from-yellow-400/80 to-transparent" />
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="bg-white border-b border-zinc-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield size={28} className="text-yellow-500" />,
              title: "Procedência Garantida",
              desc: "Todos os veículos passam por inspeção técnica completa. Documentação verificada e histórico conferido.",
            },
            {
              icon: <CreditCard size={28} className="text-yellow-500" />,
              title: "Financiamento Facilitado",
              desc: "Parceria com os principais bancos. Aprovação rápida, taxas competitivas e até 60x para pagar.",
            },
            {
              icon: <RefreshCw size={28} className="text-yellow-500" />,
              title: "Avaliação de Troca",
              desc: "Avaliamos seu veículo com preço justo de mercado. Use como entrada e saia com seu novo carro hoje.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-yellow-200 hover:shadow-md transition-all">
              <div className="bg-yellow-50 p-3 rounded-xl shrink-0">{icon}</div>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESTAQUES ── */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Estoque</span>
            <h2 className="text-3xl font-black text-zinc-900 mt-1">Veículos em Destaque</h2>
          </div>
          <Link
            href="/estoque"
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-zinc-500 hover:text-yellow-500 transition-colors"
          >
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destaques.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/estoque"
            className="inline-flex items-center gap-2 border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 font-bold px-8 py-3 rounded-full transition-all"
          >
            Ver Estoque Completo <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── BANNER CTA ── */}
      <section className="relative overflow-hidden bg-zinc-950 py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black mb-4">
            Tem um veículo para vender ou trocar?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Avaliamos seu carro gratuitamente e fazemos uma proposta justa. Atendimento rápido, sem enrolação.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getWhatsAppLink("Olá! Quero avaliar meu veículo para troca.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black px-8 py-4 rounded-full transition-all hover:scale-105"
            >
              Quero avaliar meu carro
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all"
            >
              Falar com consultor
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINANCIAMENTO ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Financiamento</span>
              <h2 className="text-3xl font-black text-zinc-900 mt-1 mb-4">
                Realize o sonho do seu carro novo hoje
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                Trabalhamos com os principais bancos e financeiras do mercado para oferecer as
                melhores condições para o seu perfil. Aprovação rápida e sem burocracia.
              </p>
              <ul className="space-y-3">
                {[
                  "Parceria com Banco Bradesco, Itaú, Santander e mais",
                  "Entrada a partir de 20%",
                  "Parcelamento em até 60 meses",
                  "Aprovação em até 24 horas",
                  "Atendimento personalizado",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-zinc-700 text-sm">
                    <CheckCircle size={16} className="text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={getWhatsAppLink("Olá! Quero simular um financiamento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-zinc-900 hover:bg-yellow-500 hover:text-zinc-900 text-white font-bold px-6 py-3 rounded-full transition-all"
              >
                Simular financiamento
              </a>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-72 md:h-80">
              <Image
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
                alt="Financiamento de veículos"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-yellow-500 text-zinc-950 font-black px-4 py-2 rounded-full text-sm">
                Até 60x para pagar
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Clientes</span>
            <h2 className="text-3xl font-black text-zinc-900 mt-1">O que dizem nossos clientes</h2>
            <p className="text-zinc-500 mt-2">Mais de 500 famílias já confiaram na Exclusive Multimarcas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {depoimentos.map((d) => (
              <div key={d.nome} className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: d.nota }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4 italic">"{d.texto}"</p>
                <div className="border-t border-zinc-100 pt-3">
                  <p className="font-bold text-zinc-900 text-sm">{d.nome}</p>
                  <p className="text-xs text-zinc-400">{d.veiculo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-yellow-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-zinc-950 text-3xl md:text-4xl font-black mb-3">
            Pronto para encontrar seu carro ideal?
          </h2>
          <p className="text-zinc-800 text-lg mb-8">
            Nossa equipe está pronta para te ajudar a encontrar o veículo perfeito para você e sua família.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/estoque"
              className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-black px-8 py-4 rounded-full transition-all"
            >
              Ver Estoque <ArrowRight size={16} />
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 font-black px-8 py-4 rounded-full transition-all"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
