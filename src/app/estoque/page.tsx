"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";
import { vehicles, marcas, tipos, anos } from "@/data/vehicles";
import type { Vehicle } from "@/data/vehicles";

const ORDER_OPTIONS = [
  { value: "destaque", label: "Destaques primeiro" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "mais-novo", label: "Mais novo" },
  { value: "mais-antigo", label: "Mais antigo" },
  { value: "menor-km", label: "Menor quilometragem" },
];

export default function EstoquePage() {
  const [search, setSearch] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [anoFiltro, setAnoFiltro] = useState("");
  const [precoMax, setPrecoMax] = useState(500000);
  const [order, setOrder] = useState("destaque");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list: Vehicle[] = [...vehicles];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.marca.toLowerCase().includes(q) ||
          v.modelo.toLowerCase().includes(q) ||
          v.versao.toLowerCase().includes(q) ||
          v.cor.toLowerCase().includes(q)
      );
    }
    if (marcaFiltro) list = list.filter((v) => v.marca === marcaFiltro);
    if (tipoFiltro) list = list.filter((v) => v.tipo === tipoFiltro);
    if (anoFiltro) list = list.filter((v) => v.ano === Number(anoFiltro));
    list = list.filter((v) => v.preco <= precoMax);

    switch (order) {
      case "menor-preco": list.sort((a, b) => a.preco - b.preco); break;
      case "maior-preco": list.sort((a, b) => b.preco - a.preco); break;
      case "mais-novo": list.sort((a, b) => b.ano - a.ano); break;
      case "mais-antigo": list.sort((a, b) => a.ano - b.ano); break;
      case "menor-km": list.sort((a, b) => a.km - b.km); break;
      default: list.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    }

    return list;
  }, [search, marcaFiltro, tipoFiltro, anoFiltro, precoMax, order]);

  const hasFilters = !!(marcaFiltro || tipoFiltro || anoFiltro || precoMax < 500000 || search);

  const clearFilters = () => {
    setSearch("");
    setMarcaFiltro("");
    setTipoFiltro("");
    setAnoFiltro("");
    setPrecoMax(500000);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page Header */}
      <div className="bg-zinc-950 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Estoque</span>
          <h1 className="text-white text-3xl md:text-4xl font-black mt-1">Nossos Veículos</h1>
          <p className="text-zinc-400 mt-2">
            {vehicles.length} veículos disponíveis · Procedência garantida · Financiamento facilitado
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por marca, modelo, cor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-yellow-400 text-sm"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
              showFilters || hasFilters
                ? "bg-yellow-500 border-yellow-500 text-zinc-950"
                : "bg-white border-zinc-200 text-zinc-700 hover:border-yellow-400"
            }`}
          >
            <SlidersHorizontal size={16} /> Filtros
            {hasFilters && (
              <span className="bg-zinc-950 text-yellow-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                !
              </span>
            )}
          </button>

          <div className="relative">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="appearance-none bg-white border border-zinc-200 rounded-xl px-4 py-3 pr-9 text-sm font-medium text-zinc-700 focus:outline-none focus:border-yellow-400 cursor-pointer"
            >
              {ORDER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-1">Marca</label>
              <select
                value={marcaFiltro}
                onChange={(e) => setMarcaFiltro(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
              >
                <option value="">Todas</option>
                {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-1">Tipo</label>
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
              >
                <option value="">Todos</option>
                {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-1">Ano</label>
              <select
                value={anoFiltro}
                onChange={(e) => setAnoFiltro(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
              >
                <option value="">Todos</option>
                {anos.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-1">
                Preço máx: R$ {(precoMax / 1000).toFixed(0)}k
              </label>
              <input
                type="range"
                min={30000}
                max={500000}
                step={5000}
                value={precoMax}
                onChange={(e) => setPrecoMax(Number(e.target.value))}
                className="w-full accent-yellow-500"
              />
              <div className="flex justify-between text-xs text-zinc-400 mt-0.5">
                <span>R$ 30k</span><span>R$ 500k</span>
              </div>
            </div>

            {hasFilters && (
              <div className="col-span-2 md:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-semibold"
                >
                  <X size={14} /> Limpar filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-zinc-500 mb-4 font-medium">
          {filtered.length} veículo{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-zinc-700 mb-2">Nenhum veículo encontrado</h3>
            <p className="text-zinc-400 mb-6">Tente ajustar os filtros ou busca</p>
            <button onClick={clearFilters} className="bg-yellow-500 text-zinc-950 font-bold px-6 py-2.5 rounded-full">
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
