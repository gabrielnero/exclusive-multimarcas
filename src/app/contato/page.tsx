"use client";
import { useState } from "react";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from "lucide-react";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: "", telefone: "", assunto: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="bg-zinc-950 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Atendimento</span>
          <h1 className="text-white text-4xl font-black mt-2 mb-3">Entre em Contato</h1>
          <p className="text-zinc-400 text-lg">
            Estamos prontos para te ajudar a encontrar o veículo ideal. Fale conosco!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-zinc-100">
            <h2 className="font-bold text-zinc-900 text-lg mb-5">Informações</h2>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <div className="bg-yellow-50 p-2.5 rounded-xl shrink-0">
                  <MapPin size={18} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 text-sm">Endereço</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Rua das Acácias, 1234 – Centro<br />
                    Marau – RS, CEP 99150-000
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-50 p-2.5 rounded-xl shrink-0">
                  <Phone size={18} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 text-sm">Telefone / WhatsApp</p>
                  <a href="tel:+5554999999999" className="text-zinc-500 text-sm hover:text-yellow-500 transition-colors">
                    (54) 99999-9999
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-50 p-2.5 rounded-xl shrink-0">
                  <Mail size={18} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 text-sm">E-mail</p>
                  <a href="mailto:contato@exclusivemultimarcas.com.br" className="text-zinc-500 text-sm hover:text-yellow-500 transition-colors break-all">
                    contato@exclusivemultimarcas.com.br
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-50 p-2.5 rounded-xl shrink-0">
                  <Clock size={18} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 text-sm">Horários</p>
                  <p className="text-zinc-500 text-sm">
                    Seg – Sex: 08h às 18h<br />
                    Sábado: 08h às 12h<br />
                    <span className="text-red-400">Domingo: Fechado</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-green-600/20"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp Agora
          </a>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-100 shadow-sm">
            {sent ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Mensagem enviada!</h3>
                <p className="text-zinc-500 mb-6">
                  Recebemos sua mensagem e entraremos em contato em breve.
                  Você também pode nos chamar diretamente no WhatsApp.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => { setSent(false); setForm({ nome: "", telefone: "", assunto: "", mensagem: "" }); }}
                    className="border border-zinc-300 text-zinc-700 font-semibold px-5 py-2.5 rounded-full text-sm hover:border-zinc-500 transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white font-bold px-5 py-2.5 rounded-full text-sm"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-zinc-900 text-xl mb-6">Envie uma mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-zinc-700 block mb-1.5">
                        Nome completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nome"
                        required
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-700 block mb-1.5">
                        Telefone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        required
                        value={form.telefone}
                        onChange={handleChange}
                        placeholder="(54) 99999-9999"
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-700 block mb-1.5">Assunto</label>
                    <select
                      name="assunto"
                      value={form.assunto}
                      onChange={handleChange}
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="compra">Quero comprar um veículo</option>
                      <option value="venda">Quero vender/trocar meu veículo</option>
                      <option value="financiamento">Dúvidas sobre financiamento</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-700 block mb-1.5">
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="mensagem"
                      required
                      rows={5}
                      value={form.mensagem}
                      onChange={handleChange}
                      placeholder="Descreva como podemos te ajudar..."
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-yellow-500 hover:text-zinc-950 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <>
                        <Send size={16} /> Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <section className="bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="font-bold text-zinc-900 text-xl mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-yellow-500" />
            Nossa Localização — Marau, RS
          </h2>
          <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55860.10543823427!2d-52.255!3d-28.449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e91d03e04b6a07%3A0x4c8c6d4e2f61c11a!2sMarau%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Exclusive Multimarcas - Marau RS"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
