"use client";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { Calculator } from "lucide-react";

type Props = {
  preco: number;
};

export default function FinancingSimulator({ preco }: Props) {
  const [entrada, setEntrada] = useState(Math.round(preco * 0.2));
  const [parcelas, setParcelas] = useState(48);
  const [open, setOpen] = useState(false);

  const taxa = 0.0149; // 1.49% a.m.
  const financiado = preco - entrada;
  const parcela =
    financiado > 0
      ? (financiado * (taxa * Math.pow(1 + taxa, parcelas))) /
        (Math.pow(1 + taxa, parcelas) - 1)
      : 0;

  return (
    <div className="rounded-2xl border border-zinc-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-zinc-50 hover:bg-zinc-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2 font-bold text-zinc-800">
          <Calculator size={18} className="text-yellow-500" />
          Simular Financiamento
        </div>
        <span className="text-zinc-400 text-xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="p-4 space-y-4 bg-white">
          <div>
            <label className="text-sm font-medium text-zinc-700 block mb-1">
              Valor de entrada: <strong>{formatCurrency(entrada)}</strong>
            </label>
            <input
              type="range"
              min={0}
              max={preco}
              step={1000}
              value={entrada}
              onChange={(e) => setEntrada(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>R$ 0</span>
              <span>{formatCurrency(preco)}</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 block mb-2">
              Número de parcelas
            </label>
            <div className="flex gap-2 flex-wrap">
              {[12, 24, 36, 48, 60].map((n) => (
                <button
                  key={n}
                  onClick={() => setParcelas(n)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    parcelas === n
                      ? "bg-yellow-500 border-yellow-500 text-zinc-900"
                      : "border-zinc-300 text-zinc-600 hover:border-yellow-400"
                  }`}
                >
                  {n}x
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl p-4 text-center">
            <p className="text-zinc-400 text-sm">Estimativa de parcela</p>
            <p className="text-yellow-400 text-3xl font-black">
              {formatCurrency(parcela)}
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              {parcelas}x · Taxa 1,49% a.m. · Sujeito à análise de crédito
            </p>
          </div>

          <p className="text-xs text-zinc-400 text-center">
            * Simulação meramente ilustrativa. Consulte nossos consultores para condições reais.
          </p>
        </div>
      )}
    </div>
  );
}
