"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MessageSquare, CheckCircle2, Trash2, Phone, Car, Filter } from "lucide-react";
import { getLeads, updateLeadStatus, deleteLead } from "@/actions/leads";
import AdminHeader from "@/components/admin/AdminHeader";
import SkeletonTable from "@/components/admin/SkeletonTable";

type Lead = {
  id: string;
  nome: string;
  telefone: string;
  mensagem: string;
  status: string;
  createdAt: Date;
  vehicle: { marca: string; modelo: string; ano: number } | null;
};

const STATUS_TABS = [
  { value: undefined, label: "Todos" },
  { value: "novo", label: "Novos" },
  { value: "atendido", label: "Atendidos" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"novo" | "atendido" | undefined>(undefined);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getLeads(filter);
      setLeads(data as Lead[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const handleAttend = async (id: string) => {
    const result = await updateLeadStatus(id, "atendido");
    if (result.error) toast.error(result.error);
    else { toast.success("Lead marcado como atendido"); load(); }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Excluir lead de "${nome}"?`)) return;
    const result = await deleteLead(id);
    if (result.error) toast.error(result.error);
    else { toast.success("Lead excluído"); load(); }
  };

  const getWhatsAppLink = (lead: Lead) => {
    const number = lead.telefone.replace(/\D/g, "");
    const vehicleText = lead.vehicle
      ? ` Gostaria de falar sobre o ${lead.vehicle.marca} ${lead.vehicle.modelo} ${lead.vehicle.ano}.`
      : "";
    const message = `Olá ${lead.nome}! Sou da Exclusive Multimarcas.${vehicleText} Posso te ajudar?`;
    return `https://wa.me/55${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit mb-5 text-sm">
          {STATUS_TABS.map((tab) => (
            <button
              key={String(tab.value)}
              onClick={() => setFilter(tab.value as typeof filter)}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                filter === tab.value
                  ? "bg-yellow-500 text-zinc-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <SkeletonTable rows={6} cols={5} />
        ) : leads.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl py-16 text-center">
            <MessageSquare size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500 font-medium">Nenhum lead encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className={`bg-white border rounded-xl p-4 shadow-sm transition-all ${
                  lead.status === "novo"
                    ? "border-yellow-200 shadow-yellow-100"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    lead.status === "novo"
                      ? "bg-red-100 text-red-600"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {lead.nome[0]?.toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-slate-800">{lead.nome}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === "novo"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {lead.status === "novo" ? "NOVO" : "ATENDIDO"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500 mb-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {lead.telefone}
                      </span>
                      {lead.vehicle && (
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full text-xs">
                          <Car size={11} /> {lead.vehicle.marca} {lead.vehicle.modelo} {lead.vehicle.ano}
                        </span>
                      )}
                    </div>

                    {lead.mensagem && (
                      <p className="text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                        "{lead.mensagem}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={getWhatsAppLink(lead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                    {lead.status === "novo" && (
                      <button
                        onClick={() => handleAttend(lead.id)}
                        title="Marcar como atendido"
                        className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(lead.id, lead.nome)}
                      title="Excluir"
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
