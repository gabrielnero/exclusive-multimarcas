import { Car, TrendingDown, MessageSquare, Star, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/actions/vehicles";
import { getLeads } from "@/actions/leads";
import StatsCard from "@/components/admin/StatsCard";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, leads] = await Promise.all([
    getDashboardStats(),
    getLeads("novo"),
  ]);

  const recentLeads = leads.slice(0, 5);

  return (
    <>
      <AdminHeader newLeadsCount={stats.newLeads} />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total de Veículos"
            value={stats.totalVehicles}
            subtitle="no estoque"
            icon={Car}
            color="blue"
          />
          <StatsCard
            title="Veículos Vendidos"
            value={stats.soldVehicles}
            subtitle="este período"
            icon={TrendingDown}
            color="green"
          />
          <StatsCard
            title="Leads Totais"
            value={stats.totalLeads}
            subtitle="contatos recebidos"
            icon={MessageSquare}
            color="yellow"
          />
          <StatsCard
            title="Novos Leads"
            value={stats.newLeads}
            subtitle="aguardando atendimento"
            icon={AlertCircle}
            color={stats.newLeads > 0 ? "red" : "slate"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent leads */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Leads recentes</h2>
              <Link
                href="/admin/leads"
                className="text-xs text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                Ver todos →
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
                Nenhum lead novo no momento
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <li key={lead.id} className="px-5 py-3.5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 text-sm truncate">{lead.nome}</p>
                      <p className="text-xs text-slate-400 truncate">
                        {lead.telefone}
                        {lead.vehicle ? ` · ${lead.vehicle.marca} ${lead.vehicle.modelo}` : ""}
                      </p>
                      {lead.mensagem && (
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{lead.mensagem}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                        NOVO
                      </span>
                      <a
                        href={`https://wa.me/${lead.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${lead.nome}! Vi sua mensagem e vim te atender.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-green-600 hover:text-green-700 font-semibold"
                      >
                        WhatsApp ↗
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick actions */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h2 className="font-semibold text-slate-800 mb-4">Ações rápidas</h2>
              <div className="space-y-2">
                <Link
                  href="/admin/veiculos/novo"
                  className="flex items-center gap-3 w-full bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold px-4 py-3 rounded-lg transition-all text-sm"
                >
                  <Plus size={16} /> Adicionar veículo
                </Link>
                <Link
                  href="/admin/leads"
                  className="flex items-center gap-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-3 rounded-lg transition-all text-sm"
                >
                  <MessageSquare size={16} /> Ver todos os leads
                </Link>
                <Link
                  href="/admin/configuracoes"
                  className="flex items-center gap-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-3 rounded-lg transition-all text-sm"
                >
                  <Star size={16} /> Configurações do site
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-3 rounded-lg transition-all text-sm"
                >
                  <Car size={16} /> Ver site público ↗
                </Link>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-slate-900 rounded-xl p-5 text-white">
              <h3 className="font-semibold text-sm mb-3">Resumo do estoque</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Disponíveis</span>
                  <span className="font-bold text-green-400">
                    {stats.totalVehicles - stats.soldVehicles}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Vendidos</span>
                  <span className="font-bold text-slate-300">{stats.soldVehicles}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Em destaque</span>
                  <span className="font-bold text-yellow-400">{stats.featuredVehicles}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
