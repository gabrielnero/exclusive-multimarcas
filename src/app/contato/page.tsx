"use client";
import { useState } from "react";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Contato
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-black mb-3">Fale com a gente</h1>
          <p className="text-zinc-400 text-lg">
            Nossa equipe está pronta para te ajudar. Atendimento rápido e sem enrolação.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-zinc-900 mb-6">Informações de contato</h2>
            <ul className="space-y-5 mb-8">
              <li className="flex items-start gap-4">
                <div className="bg-orange-50 p-2.5 rounded-xl mt-0.5">
                  <MapPin size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900">Localização</p>
                  <p className="text-zinc-500 text-sm mt-0.5">Marau – RS, Brasil</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-orange-50 p-2.5 rounded-xl mt-0.5">
                  <Phone size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900">WhatsApp / Telefone</p>
                  <a
                    href="tel:+5554996083808"
                    className="text-zinc-500 text-sm hover:text-orange-500 transition-colors mt-0.5 block"
                  >
                    (54) 99608-3808
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-orange-50 p-2.5 rounded-xl mt-0.5">
                  <Clock size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900">Horário de Funcionamento</p>
                  <p className="text-zinc-500 text-sm mt-0.5">Segunda a Sexta: 08h às 18h</p>
                  <p className="text-zinc-500 text-sm">Sábado: 08h às 12h</p>
                </div>
              </li>
            </ul>

            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
              <p className="font-bold text-zinc-900 mb-3">Atendimento imediato pelo WhatsApp</p>
              <p className="text-zinc-500 text-sm mb-4">
                Para agilizar seu atendimento, fale diretamente com nossos consultores pelo WhatsApp. Resposta rápida garantida!
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-3 rounded-full transition-all text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chamar no WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-black text-zinc-900 mb-6">Envie uma mensagem</h2>

            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Mensagem enviada!</h3>
                <p className="text-zinc-500 text-sm">
                  Obrigado pelo contato! Nossa equipe retornará em breve via WhatsApp ou e-mail.
                </p>
                <button
                  onClick={() => { setSent(false); setFormData({ nome: "", email: "", telefone: "", mensagem: "" }); }}
                  className="mt-5 text-sm text-orange-500 font-semibold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      placeholder="(54) 99999-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1">
                    Mensagem *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                    placeholder="Qual veículo te interessou? Como podemos te ajudar?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-60"
                >
                  <Send size={16} />
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
