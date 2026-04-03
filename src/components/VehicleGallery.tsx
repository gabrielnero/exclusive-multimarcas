"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
};

export default function VehicleGallery({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 bg-zinc-900 cursor-zoom-in" onClick={() => setLightbox(true)}>
        <Image
          src={images[current]}
          alt={`${alt} - imagem ${current + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all">
          <ChevronLeft size={20} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all">
          <ChevronRight size={20} />
        </button>
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <ZoomIn size={12} /> {current + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              i === current ? "border-yellow-500" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full" onClick={() => setLightbox(false)}>
            <X size={24} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={28} />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh] px-16" onClick={(e) => e.stopPropagation()}>
            <Image src={images[current]} alt={`${alt} ampliado`} fill className="object-contain" sizes="100vw" />
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={28} />
          </button>
          <p className="absolute bottom-6 text-zinc-400 text-sm">{current + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}
