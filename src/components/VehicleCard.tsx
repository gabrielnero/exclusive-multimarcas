"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Fuel, Calendar, Gauge } from "lucide-react";
import { useState } from "react";
import { Vehicle } from "@/data/vehicles";
import { formatCurrency, formatKm } from "@/utils/format";

type Props = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: Props) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-100">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <Image
          src={vehicle.imagens[0]}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {vehicle.oferta && (
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              🔥 Oferta
            </span>
          )}
          {vehicle.destaque && !vehicle.oferta && (
            <span className="bg-yellow-500 text-zinc-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
              ⭐ Destaque
            </span>
          )}
          {vehicle.uniDisponivel && (
            <span className="bg-zinc-900 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              🔔 Única unidade
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={() => setFavorited(!favorited)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow hover:scale-110 transition-transform"
          aria-label="Favoritar"
        >
          <Heart
            size={16}
            className={favorited ? "fill-red-500 text-red-500" : "text-zinc-400"}
          />
        </button>

        {/* Type badge */}
        <span className="absolute bottom-3 right-3 bg-zinc-900/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
          {vehicle.tipo}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{vehicle.marca}</span>
          <h3 className="text-zinc-900 font-bold text-base leading-tight">
            {vehicle.modelo} <span className="font-normal text-zinc-600">{vehicle.versao}</span>
          </h3>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-3 mt-2 mb-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {vehicle.ano}
          </span>
          <span className="flex items-center gap-1">
            <Gauge size={12} /> {formatKm(vehicle.km)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={12} /> {vehicle.combustivel}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-zinc-400">a partir de</span>
            <p className="text-yellow-600 font-black text-xl leading-tight">
              {formatCurrency(vehicle.preco)}
            </p>
            <span className="text-xs text-zinc-400">ou financie em até 60x</span>
          </div>
          <Link
            href={`/veiculo/${vehicle.id}`}
            className="bg-zinc-900 hover:bg-yellow-500 hover:text-zinc-900 text-white text-xs font-bold px-4 py-2 rounded-full transition-all"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
