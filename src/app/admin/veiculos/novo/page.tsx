import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import VehicleForm from "@/components/admin/VehicleForm";

export const metadata: Metadata = { title: "Novo Veículo" };

export default function NovoVeiculoPage() {
  return (
    <>
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-800">Adicionar novo veículo</h1>
          <p className="text-slate-400 text-sm mt-1">Preencha os dados do veículo para adicionar ao estoque.</p>
        </div>
        <VehicleForm />
      </main>
    </>
  );
}
