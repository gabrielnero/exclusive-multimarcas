import Image from "next/image";
import Link from "next/link";
import { Shield, CreditCard, RefreshCw, Users, MapPin, Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Metadata } from "next";
import { getWhatsAppLink } from "@/utils/whatsapp";

export const metadata: Metadata = {
  title: "Sobre Nós | Exclusive Multimarcas",
  description:
    "Conheça a Exclusive Multimarcas, sua revenda de confiança em Marau - RS. Seminovos com procedência garantida, financiamento facilitado e atendimento diferenciado.",
};

const values = [
  {
    icon: <Shield size={24} className="text-orange-500" />,
    title: "Procedência Garantida",
    desc: "Cada veículo passa por verificação rigorosa de documentação e histórico antes de entrar no nosso estoque.",
  },
  {
    icon: <CreditCard size={24} className="text-orange-500" />,
    title: "Financiamento Facilitado",
    desc: "Parceria com os principais bancos do mercado para aprovação rápida e taxas competitivas.",
  },
  {
    icon: <RefreshCw size={24} className="text-orange-500" />,
    title: "Avaliação Justa",
    desc: "Avaliamos seu veículo com transparência e valor de mercado real. Use como entrada na troca.",
  },
  {
    icon: <Users size={24} className="text-orange-500" />,
    title: "Atendimento Personalizado",
    desc: "Nossa equipe está sempre pronta para entender sua necessidade e encontrar o melhor veículo para você.",
  },
];

export default function Sobre() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1583267746897-2cf415887172?w=1600&q=80"
            alt="Exclusive Multimarcas"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 to-zinc-950" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Nossa História
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            Exclusive Multimarcas
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Referência em seminovos na região de Marau - RS, com atendimento personalizado e compromisso com a satisfação total do cliente.
          </p>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-500 text-sm font-bold uppercase tracking-widest">Quem somos</span>
            <h2 className="text-3xl font-black text-zinc-900 mt-1 mb-4">
              Mais do que uma revenda. Uma parceria de confiança.
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              A Exclusive Multimarcas nasceu com um propósito claro: oferecer veículos seminovos de qualidade com a transparência e o cuidado que cada cliente merece. Localizada em Marau - RS, somos reconhecidos pela seriedade, pelo atendimento diferenciado e pela qualidade dos nossos veículos.
            </p>
            <p className="text-zinc-600 leading-relaxed mb-6">
              Nosso estoque é cuidadosamente selecionado para garantir que cada veículo vendido esteja em perfeito estado, com documentação em dia e histórico verificado. Trabalhamos com as principais marcas do mercado para oferecer opções que atendam a todos os perfis e necessidades.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Veículos avaliados e selecionados com critério",
                "Documentação conferida antes de cada venda",
                "Financiamento com aprovação rápida",
                "Avaliação de troca com preço justo",
                "Atendimento presencial e via WhatsApp",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-zinc-700 text-sm">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-full transition-all"
            >
              Falar com nossa equipe <ArrowRight size={16} />
            </a>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
                alt="Exclusive Multimarcas"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-4 rounded-2xl shadow-xl">
              <p className="font-black text-2xl">100%</p>
              <p className="text-xs font-semibold">Procedência garantida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-orange-500 text-sm font-bold uppercase tracking-widest">Nossos valores</span>
            <h2 className="text-3xl font-black text-zinc-900 mt-1">
              Por que escolher a Exclusive?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl border border-zinc-100 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="bg-orange-50 p-3 rounded-xl inline-flex mb-4">{icon}</div>
                <h3 className="font-bold text-zinc-900 mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-orange-500 text-sm font-bold uppercase tracking-widest">Onde estamos</span>
              <h2 className="text-3xl font-black text-zinc-900 mt-1 mb-6">
                Venha nos visitar
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-orange-50 p-2 rounded-xl mt-0.5">
                    <MapPin size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Localização</p>
                    <p className="text-zinc-500 text-sm">Marau – RS, Brasil</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-50 p-2 rounded-xl mt-0.5">
                    <Phone size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Telefone / WhatsApp</p>
                    <a href="tel:+5554996083808" className="text-zinc-500 text-sm hover:text-orange-500 transition-colors">
                      (54) 99608-3808
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-50 p-2 rounded-xl mt-0.5">
                    <Clock size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Horário de Funcionamento</p>
                    <p className="text-zinc-500 text-sm">Segunda a Sexta: 08h às 18h</p>
                    <p className="text-zinc-500 text-sm">Sábado: 08h às 12h</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-3 rounded-full transition-all text-sm"
                >
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/exclusivemarau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold px-5 py-3 rounded-full transition-all text-sm"
                >
                  @exclusivemarau
                </a>
              </div>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Entre em contato</h3>
              <p className="text-zinc-500 text-sm mb-6">
                Tem dúvidas, quer ver um veículo específico ou negociar? Nossa equipe responde rápido e sem enrolação.
              </p>
              <div className="space-y-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-3.5 rounded-xl transition-all text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chamar no WhatsApp
                </a>
                <Link
                  href="/contato"
                  className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-4 py-3.5 rounded-xl transition-all text-sm"
                >
                  Enviar mensagem pelo site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-orange-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-black mb-3">
            Venha conhecer nosso estoque pessoalmente!
          </h2>
          <p className="text-orange-100 mb-6">
            Nada substitui ver e sentir o carro de perto. Te esperamos em Marau - RS!
          </p>
          <Link
            href="/estoque"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-black px-8 py-4 rounded-full transition-all"
          >
            Ver Estoque <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
