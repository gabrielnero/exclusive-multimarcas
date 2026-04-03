"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Save, Globe, Phone, MapPin, Share2, Search } from "lucide-react";
import { getSettings, updateSettings } from "@/actions/settings";
import AdminHeader from "@/components/admin/AdminHeader";
import type { SettingsInput } from "@/lib/validations";

const FIELD =
  "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all bg-white";
const TEXTAREA = FIELD + " resize-none";
const LABEL = "block text-sm font-medium text-slate-700 mb-1.5";

type Section = {
  icon: React.ReactNode;
  title: string;
  fields: Array<{
    key: keyof SettingsInput;
    label: string;
    placeholder?: string;
    type?: string;
    rows?: number;
  }>;
};

export default function ConfiguracoesPage() {
  const [form, setForm] = useState<SettingsInput>({
    nomeLoja: "",
    descricao: "",
    whatsapp: "",
    endereco: "",
    instagram: "",
    facebook: "",
    seoTitle: "",
    seoDesc: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then((s) => {
      setForm({
        nomeLoja: s.nomeLoja,
        descricao: s.descricao,
        whatsapp: s.whatsapp,
        endereco: s.endereco,
        instagram: s.instagram,
        facebook: s.facebook,
        seoTitle: s.seoTitle,
        seoDesc: s.seoDesc,
      });
      setLoading(false);
    });
  }, []);

  const set = (key: keyof SettingsInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const result = await updateSettings(form);
    if (result?.error) toast.error(result.error);
    else toast.success("Configurações salvas com sucesso!");
    setSaving(false);
  };

  const sections: Section[] = [
    {
      icon: <Globe size={16} className="text-yellow-500" />,
      title: "Informações gerais",
      fields: [
        { key: "nomeLoja", label: "Nome da loja", placeholder: "Exclusive Multimarcas" },
        { key: "descricao", label: "Descrição da home", placeholder: "Breve descrição exibida no site...", rows: 3 },
      ],
    },
    {
      icon: <Phone size={16} className="text-yellow-500" />,
      title: "Contato",
      fields: [
        { key: "whatsapp", label: "WhatsApp (somente números)", placeholder: "5554999999999" },
        { key: "endereco", label: "Endereço completo", placeholder: "Rua das Acácias, 1234 – Centro, Marau – RS" },
      ],
    },
    {
      icon: <Share2 size={16} className="text-yellow-500" />,
      title: "Redes Sociais",
      fields: [
        { key: "instagram", label: "Instagram (URL)", placeholder: "https://instagram.com/..." },
        { key: "facebook", label: "Facebook (URL)", placeholder: "https://facebook.com/..." },
      ],
    },
    {
      icon: <Search size={16} className="text-yellow-500" />,
      title: "SEO",
      fields: [
        { key: "seoTitle", label: "Title padrão (SEO)", placeholder: "Exclusive Multimarcas | Veículos em Marau - RS" },
        { key: "seoDesc", label: "Meta description (SEO)", placeholder: "Descrição para mecanismos de busca...", rows: 3 },
      ],
    },
  ];

  if (loading) {
    return (
      <>
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-4 max-w-2xl">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-32 mb-4" />
                <div className="space-y-3">
                  <div className="h-10 bg-slate-100 rounded-lg" />
                  <div className="h-10 bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
          {sections.map(({ icon, title, fields }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                {icon} {title}
              </h2>
              <div className="space-y-4">
                {fields.map(({ key, label, placeholder, rows }) => (
                  <div key={key}>
                    <label className={LABEL}>{label}</label>
                    {rows ? (
                      <textarea
                        rows={rows}
                        value={form[key]}
                        onChange={(e) => set(key, e.target.value)}
                        placeholder={placeholder}
                        className={TEXTAREA}
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[key]}
                        onChange={(e) => set(key, e.target.value)}
                        placeholder={placeholder}
                        className={FIELD}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end pb-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Salvando..." : "Salvar configurações"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
