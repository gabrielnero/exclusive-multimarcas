"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, X, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { createVehicle, updateVehicle } from "@/actions/vehicles";
import type { VehicleInput } from "@/lib/validations";

type Vehicle = VehicleInput & { id?: string };

type Props = {
  initialData?: Partial<Vehicle>;
  vehicleId?: string;
};

const COMBUSTIVEIS = ["Flex", "Gasolina", "Diesel", "Elétrico", "Híbrido"];
const CAMBIOS = ["Manual", "Automático", "CVT", "Automatizado"];
const TIPOS = ["SUV", "Sedan", "Hatch", "Pickup", "Minivan", "Esportivo"];

const FIELD_LABEL = "block text-sm font-medium text-slate-700 mb-1.5";
const FIELD_INPUT =
  "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all bg-white";
const SELECT_FIELD = FIELD_INPUT + " appearance-none bg-white cursor-pointer";

export default function VehicleForm({ initialData, vehicleId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [novoOpcional, setNovoOpcional] = useState("");

  const [form, setForm] = useState<VehicleInput>({
    marca: initialData?.marca ?? "",
    modelo: initialData?.modelo ?? "",
    versao: initialData?.versao ?? "",
    ano: initialData?.ano ?? new Date().getFullYear(),
    preco: initialData?.preco ?? 0,
    km: initialData?.km ?? 0,
    combustivel: (initialData?.combustivel as VehicleInput["combustivel"]) ?? "Flex",
    cambio: (initialData?.cambio as VehicleInput["cambio"]) ?? "Automático",
    cor: initialData?.cor ?? "",
    tipo: (initialData?.tipo as VehicleInput["tipo"]) ?? "Sedan",
    descricao: initialData?.descricao ?? "",
    opcionais: initialData?.opcionais ?? [],
    imagens: initialData?.imagens ?? [],
    destaque: initialData?.destaque ?? false,
    oferta: initialData?.oferta ?? false,
  });

  const set = (key: keyof VehicleInput, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addOpcional = () => {
    if (novoOpcional.trim() && !form.opcionais.includes(novoOpcional.trim())) {
      set("opcionais", [...form.opcionais, novoOpcional.trim()]);
      setNovoOpcional("");
    }
  };

  const removeOpcional = (item: string) => {
    set("opcionais", form.opcionais.filter((o) => o !== item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = vehicleId
        ? await updateVehicle(vehicleId, form)
        : await createVehicle(form);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(vehicleId ? "Veículo atualizado!" : "Veículo criado com sucesso!");
        router.push("/admin/veiculos");
      }
    } catch {
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Badges */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">Status</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { key: "destaque", label: "⭐ Destaque" },
            { key: "oferta", label: "🔥 Oferta" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form[key as "destaque" | "oferta"]}
                onChange={(e) => set(key as "destaque" | "oferta", e.target.checked)}
                className="w-4 h-4 accent-yellow-500"
              />
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Basic info */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">Informações Básicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={FIELD_LABEL}>Marca <span className="text-red-500">*</span></label>
            <input required value={form.marca} onChange={(e) => set("marca", e.target.value)} placeholder="Ex: Toyota" className={FIELD_INPUT} />
          </div>
          <div>
            <label className={FIELD_LABEL}>Modelo <span className="text-red-500">*</span></label>
            <input required value={form.modelo} onChange={(e) => set("modelo", e.target.value)} placeholder="Ex: Corolla" className={FIELD_INPUT} />
          </div>
          <div>
            <label className={FIELD_LABEL}>Versão</label>
            <input value={form.versao} onChange={(e) => set("versao", e.target.value)} placeholder="Ex: XEi 2.0 Flex" className={FIELD_INPUT} />
          </div>
          <div>
            <label className={FIELD_LABEL}>Ano <span className="text-red-500">*</span></label>
            <input required type="number" value={form.ano} onChange={(e) => set("ano", Number(e.target.value))} min={1990} max={new Date().getFullYear() + 1} className={FIELD_INPUT} />
          </div>
          <div>
            <label className={FIELD_LABEL}>Tipo</label>
            <select value={form.tipo} onChange={(e) => set("tipo", e.target.value)} className={SELECT_FIELD}>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={FIELD_LABEL}>Cor <span className="text-red-500">*</span></label>
            <input required value={form.cor} onChange={(e) => set("cor", e.target.value)} placeholder="Ex: Branco Pérola" className={FIELD_INPUT} />
          </div>
        </div>
      </div>

      {/* Technical */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">Dados Técnicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={FIELD_LABEL}>Preço (R$) <span className="text-red-500">*</span></label>
            <input required type="number" value={form.preco || ""} onChange={(e) => set("preco", Number(e.target.value))} placeholder="0" min={0} className={FIELD_INPUT} />
          </div>
          <div>
            <label className={FIELD_LABEL}>Quilometragem</label>
            <input type="number" value={form.km || ""} onChange={(e) => set("km", Number(e.target.value))} placeholder="0" min={0} className={FIELD_INPUT} />
          </div>
          <div>
            <label className={FIELD_LABEL}>Combustível</label>
            <select value={form.combustivel} onChange={(e) => set("combustivel", e.target.value)} className={SELECT_FIELD}>
              {COMBUSTIVEIS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={FIELD_LABEL}>Câmbio</label>
            <select value={form.cambio} onChange={(e) => set("cambio", e.target.value)} className={SELECT_FIELD}>
              {CAMBIOS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">Descrição</h2>
        <textarea
          rows={4}
          value={form.descricao}
          onChange={(e) => set("descricao", e.target.value)}
          placeholder="Descreva o veículo em detalhes: histórico, condição, revisões..."
          className={FIELD_INPUT + " resize-none"}
        />
      </div>

      {/* Opcionais */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">Opcionais</h2>
        <div className="flex gap-2 mb-3">
          <input
            value={novoOpcional}
            onChange={(e) => setNovoOpcional(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addOpcional(); } }}
            placeholder="Ex: Teto solar elétrico"
            className={FIELD_INPUT}
          />
          <button type="button" onClick={addOpcional} className="bg-yellow-500 hover:bg-yellow-400 text-zinc-900 px-3 py-2 rounded-lg font-bold transition-all shrink-0">
            <Plus size={16} />
          </button>
        </div>
        {form.opcionais.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.opcionais.map((op) => (
              <span key={op} className="flex items-center gap-1.5 bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full">
                {op}
                <button type="button" onClick={() => removeOpcional(op)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">Fotos</h2>
        <ImageUpload value={form.imagens} onChange={(urls) => set("imagens", urls)} />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/veiculos")}
          className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 transition-all text-sm"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold px-6 py-2.5 rounded-lg transition-all disabled:opacity-60 text-sm"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {vehicleId ? "Salvar alterações" : "Criar veículo"}
        </button>
      </div>
    </form>
  );
}
