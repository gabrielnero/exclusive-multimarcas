import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, Heart, TrendingUp, Users, Star, CheckCircle, ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "@/utils/whatsapp";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Exclusive Multimarcas, revenda de veículos seminovos em Marau - RS. Nossa história, missão e compromisso com a qualidade.",
};

const valores = [
  {
    icon: <Shield className="text-yellow-500" size={24} />,
    title: "Integridade",
    desc: "Transparência total em cada negociação. Acreditamos que a honestidade é a base de um relacionamento duradouro.",
  },
  {
    icon: <Heart className="text-yellow-500" size={24} />,
    title: "Cuidado",
    desc: "Tratamos cada cliente como parte da família. Seu satisfação é nossa maior conquista.",
  },
  {
    icon: <TrendingUp className="text-yellow-500" size={24} />,
    title: "Excelência",
    desc: "Buscamos sempre superar expectativas, oferecendo veículos de qualidade e um atendimento excepcional.",
  },
  {
    icon: <Users className="text-yellow-500" size={24} />,
    title: "Comunidade",
    desc: "Somos orgulhosamente de Marau. Contribuímos para o crescimento da nossa cidade e região.",
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-zinc-950 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80"
            alt="Sobre a Exclusive Multimarcas"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-zinc-950/50" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Nossa História</span>
          <h1 className="text-white text-4xl md:text-5xl font-black mt-2 mb-4">
            Sobre a Exclusive Multimarcas
          </h1>
          <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Há mais de 10 anos conectando pessoas aos melhores veículos em Marau e região,
            com confiança, transparência e qualidade em cada negociação.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden h-80 md:h-[450px]">
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"
              alt="Loja Exclusive Multimarcas"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-4">
                {[["10+", "Anos"], ["+500", "Clientes"], ["4.9★", "Avaliação"]].map(([num, label]) => (
                  <div key={label} className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                    <p className="font-black text-yellow-600 text-lg leading-tight">{num}</p>
                    <p className="text-xs text-zinc-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Nossa história</span>
            <h2 className="text-3xl font-black text-zinc-900 mt-2 mb-5">
              Nascemos para transformar a experiência de comprar um carro
            </h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed">
              <p>
                A <strong className="text-zinc-900">Exclusive Multimarcas</strong> foi fundada com um propósito claro:
                oferecer a melhor experiência de compra de veículos seminovos para as famílias de Marau e toda a
                região de Passo Fundo.
              </p>
              <p>
                Com mais de uma década de atuação, construímos nossa reputação através do atendimento personalizado,
                da rigorosa seleção de veículos e da transparência em cada negociação. Cada carro no nosso estoque
                passa por uma inspeção técnica completa antes de ser ofertado.
              </p>
              <p>
                Trabalhamos com as melhores marcas do mercado — Toyota, Volkswagen, Honda, Jeep, BMW e muito mais —
                sempre garantindo a procedência e o histórico de cada veículo.
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {[
                "Inspeção técnica em 100% dos veículos",
                "Documentação verificada e em dia",
                "Financiamento com aprovação rápida",
                "Avaliação justa do seu usado",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-700">
                  <CheckCircle size={15} className="text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">DNA</span>
            <h2 className="text-3xl font-black text-zinc-900 mt-1">Missão, Visão e Valores</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-zinc-950 text-white rounded-2xl p-8">
              <div className="text-yellow-400 font-black text-sm uppercase tracking-widest mb-3">Nossa Missão</div>
              <p className="text-lg leading-relaxed text-zinc-300">
                Proporcionar a melhor experiência na compra de veículos seminovos, com transparência,
                qualidade e um atendimento que supere as expectativas dos nossos clientes.
              </p>
            </div>
            <div className="bg-yellow-500 text-zinc-950 rounded-2xl p-8">
              <div className="font-black text-sm uppercase tracking-widest mb-3 opacity-70">Nossa Visão</div>
              <p className="text-lg leading-relaxed font-medium">
                Ser a revenda de veículos mais confiada e reconhecida do Rio Grande do Sul,
                sendo referência em qualidade, honestidade e satisfação do cliente.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valores.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-zinc-100 hover:border-yellow-200 hover:shadow-md transition-all">
                <div className="bg-yellow-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Reputação</span>
            <h2 className="text-3xl font-black text-zinc-900 mt-1">Avaliações dos nossos clientes</h2>
          </div>
          <div className="bg-zinc-950 rounded-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={32} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white text-5xl font-black mb-2">4.9 / 5.0</p>
            <p className="text-zinc-400 mb-6">Baseado em +200 avaliações verificadas no Google</p>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              {[["98%", "Recomendariam"], ["+500", "Clientes"], ["10+", "Anos"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-yellow-400 font-black text-xl">{num}</p>
                  <p className="text-zinc-500 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-yellow-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-zinc-950 mb-3">
            Venha nos visitar em Marau!
          </h2>
          <p className="text-zinc-800 mb-6">
            Rua das Acácias, 1234 — Centro, Marau - RS. Seg–Sex 8h–18h | Sáb 8h–12h.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-zinc-950 text-white font-bold px-8 py-4 rounded-full hover:bg-zinc-800 transition-all"
            >
              Falar no WhatsApp
            </a>
            <Link
              href="/estoque"
              className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 font-bold px-8 py-4 rounded-full hover:bg-zinc-100 transition-all"
            >
              Ver Estoque <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
