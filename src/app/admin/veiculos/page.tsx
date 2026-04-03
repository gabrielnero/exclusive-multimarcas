"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Plus, Search, Filter, Star, Flame, CheckCircle2,
  Pencil, Trash2, Copy, MoreVertical, Car, ChevronDown,
} from "lucide-react";
import {
  getVehicles, deleteVehicle, toggleVehicleSold,
  toggleVehicleDestaque, toggleVehicleOferta, duplicateVehicle,
} from "@/actions/vehicles";
import { formatCurrency, formatKm } from "@/utils/format";
import AdminHeader from "@/components/admin/AdminHeader";
import SkeletonTable from "@/components/admin/SkeletonTable";
import type { Vehicle } from "@prisma/client";

type VehicleWithCount = Vehicle & { _count: { leads: number } };

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "available", label: "Disponíveis" },
  { value: "sold", label: "Vendidos" },
];

export default function VeiculosPage() {
  const [vehicles, setVehicles] = useState<VehicleWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "available" | "sold">("available");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getVehicles({ search: search || undefined, status });
      setVehicles(data);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Excluir "${nome}"? Esta ação não pode ser desfeita.`)) return;
    const result = await deleteVehicle(id);
    if (result.error) toast.error(result.error);
    else { toast.success("Veículo excluído"); load(); }
    setOpenMenu(null);
  };

  const handleToggle = async (
    action: "sold" | "destaque" | "oferta",
    id: string,
    current: boolean
  ) => {
    if (action === "sold") await toggleVehicleSold(id, !current);
    else if (action === "destaque") await toggleVehicleDestaque(id, !current);
    else await toggleVehicleOferta(id, !current);

    load();
    setOpenMenu(null);
  };

  const handleDuplicate = async (id: string) => {
    const result = await duplicateVehicle(id);
    if (result.error) toast.error(result.error);
    else { toast.success("Veículo duplicado!"); load(); }
    setOpenMenu(null);
  };

  return (
    <>
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar veículo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 bg-white"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden text-sm">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value as typeof status)}
                  className={`px-3 py-2 font-medium transition-all ${
                    status === opt.value
                      ? "bg-yellow-500 text-zinc-900"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <Link
              href="/admin/veiculos/novo"
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold px-4 py-2.5 rounded-lg text-sm transition-all"
            >
              <Plus size={15} /> Novo veículo
            </Link>
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-slate-500 mb-3 font-medium">
          {loading ? "Carregando..." : `${vehicles.length} veículo${vehicles.length !== 1 ? "s" : ""}`}
        </p>

        {/* Table */}
        {loading ? (
          <SkeletonTable rows={6} cols={6} />
        ) : vehicles.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl py-16 text-center">
            <Car size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500 font-medium">Nenhum veículo encontrado</p>
            <Link href="/admin/veiculos/novo" className="inline-flex items-center gap-2 mt-4 bg-yellow-500 text-zinc-900 font-bold px-5 py-2 rounded-lg text-sm">
              <Plus size={14} /> Adicionar primeiro veículo
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-3 font-semibold">Veículo</th>
                    <th className="text-left px-4 py-3 font-semibold">Ano / KM</th>
                    <th className="text-left px-4 py-3 font-semibold">Preço</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 font-semibold">Leads</th>
                    <th className="text-right px-4 py-3 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            {v.imagens[0] ? (
                              <Image
                                src={v.imagens[0]}
                                alt={v.modelo}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Car size={16} className="text-slate-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {v.marca} {v.modelo}
                            </p>
                            <p className="text-xs text-slate-400">{v.versao || v.cor}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <p>{v.ano}</p>
                        <p className="text-xs text-slate-400">{formatKm(v.km)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-800">{formatCurrency(v.preco)}</p>
                        <p className="text-xs text-slate-400">{v.combustivel} · {v.cambio}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {v.vendido ? (
                            <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                              Vendido
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                              Disponível
                            </span>
                          )}
                          {v.destaque && (
                            <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Star size={10} /> Destaque
                            </span>
                          )}
                          {v.oferta && (
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Flame size={10} /> Oferta
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {v._count.leads > 0 ? (
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {v._count.leads}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/veiculos/${v.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                            title="Editar"
                          >
                            <Pencil size={14} />
                          </Link>

                          {/* Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                            >
                              <MoreVertical size={14} />
                            </button>

                            {openMenu === v.id && (
                              <div className="absolute right-0 top-8 z-50 bg-white border border-slate-200 rounded-xl shadow-xl py-1 w-48">
                                <button
                                  onClick={() => handleToggle("sold", v.id, v.vendido)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <CheckCircle2 size={14} />
                                  {v.vendido ? "Marcar disponível" : "Marcar vendido"}
                                </button>
                                <button
                                  onClick={() => handleToggle("destaque", v.id, v.destaque)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <Star size={14} />
                                  {v.destaque ? "Remover destaque" : "Marcar destaque"}
                                </button>
                                <button
                                  onClick={() => handleToggle("oferta", v.id, v.oferta)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <Flame size={14} />
                                  {v.oferta ? "Remover oferta" : "Marcar oferta"}
                                </button>
                                <button
                                  onClick={() => handleDuplicate(v.id)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <Copy size={14} /> Duplicar
                                </button>
                                <hr className="my-1 border-slate-100" />
                                <button
                                  onClick={() => handleDelete(v.id, `${v.marca} ${v.modelo}`)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 size={14} /> Excluir
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
