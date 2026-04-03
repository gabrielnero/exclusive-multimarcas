"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Fuel, Calendar, Gauge } from "lucide-react";
import { useState } from "react";
import type { VehiclePublic } from "@/types/vehicle";
import { formatCurrency, formatKm } from "@/utils/format";

type Props = {
  vehicle: VehiclePublic;
};

export default function VehicleCard({ vehicle }: Props) {
  const [favorited, setFavorited] = useState(false);
  const showKm = vehicle.km > 0;
  const isConsulte = vehicle.preco === 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-100">
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-zinc-100">
        {vehicle.imagens.length > 0 && vehicle.imagens[0].startsWith("data:") && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.imagens[0]}
            alt={`${vehicle.marca} ${vehicle.modelo}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {vehicle.imagens.length > 0 && !vehicle.imagens[0].startsWith("data:") && (
          <Image
            src={vehicle.imagens[0]}
            alt={`${vehicle.marca} ${vehicle.modelo}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={!vehicle.imagens[0].includes("unsplash.com")}
          />
        )}
        {vehicle.imagens.length === 0 && (
          <div className="flex items-center justify-center h-full text-zinc-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 opacity-30">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {vehicle.oferta && (
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              🔥 Oferta
            </span>
          )}
          {vehicle.destaque && !vehicle.oferta && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              ⭐ Destaque
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
          {showKm && (
            <span className="flex items-center gap-1">
              <Gauge size={12} /> {formatKm(vehicle.km)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Fuel size={12} /> {vehicle.combustivel}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            {isConsulte ? (
              <>
                <span className="text-xs text-zinc-400">valor</span>
                <p className="text-orange-500 font-black text-xl leading-tight">Consulte</p>
                <span className="text-xs text-zinc-400">financiamento disponível</span>
              </>
            ) : (
              <>
                <span className="text-xs text-zinc-400">a partir de</span>
                <p className="text-orange-600 font-black text-xl leading-tight">
                  {formatCurrency(vehicle.preco)}
                </p>
                <span className="text-xs text-zinc-400">ou financie em até 60x</span>
              </>
            )}
          </div>
          <Link
            href={`/veiculo/${vehicle.id}`}
            className="bg-zinc-900 hover:bg-orange-500 hover:text-white text-white text-xs font-bold px-4 py-2 rounded-full transition-all"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
