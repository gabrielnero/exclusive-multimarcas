import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getVehicleById } from "@/actions/vehicles";
import AdminHeader from "@/components/admin/AdminHeader";
import VehicleForm from "@/components/admin/VehicleForm";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Editar Veículo" };

export default async function EditVeiculoPage({ params }: Props) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  return (
    <>
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <Link
            href="/admin/veiculos"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-3"
          >
            <ChevronLeft size={14} /> Voltar
          </Link>
          <h1 className="text-xl font-bold text-slate-800">
            Editar: {vehicle.marca} {vehicle.modelo}
          </h1>
          <p className="text-slate-400 text-sm mt-1">{vehicle.versao} · {vehicle.ano}</p>
        </div>
        <VehicleForm
          vehicleId={id}
          initialData={{
            ...vehicle,
            combustivel: vehicle.combustivel as VehicleInput["combustivel"],
            cambio: vehicle.cambio as VehicleInput["cambio"],
            tipo: vehicle.tipo as VehicleInput["tipo"],
          }}
        />
      </main>
    </>
  );
}

type VehicleInput = {
  combustivel: "Flex" | "Gasolina" | "Diesel" | "Elétrico" | "Híbrido";
  cambio: "Manual" | "Automático" | "CVT" | "Automatizado";
  tipo: "SUV" | "Sedan" | "Hatch" | "Pickup" | "Minivan" | "Esportivo";
};
