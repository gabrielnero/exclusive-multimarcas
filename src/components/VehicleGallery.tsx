"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
};

function SmartImage({ src, alt, className, fill, sizes, priority }: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  const isBase64 = src.startsWith("data:");

  if (isBase64) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`${className ?? ""} ${fill ? "absolute inset-0 w-full h-full" : ""} object-cover`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={src.startsWith("http") && !src.includes("unsplash.com")}
    />
  );
}

export default function VehicleGallery({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (images.length === 0) {
    return (
      <div className="rounded-2xl overflow-hidden h-72 md:h-96 bg-zinc-100 flex items-center justify-center">
        <div className="text-center text-zinc-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 mx-auto mb-2 opacity-30">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          </svg>
          <p className="text-sm">Fotos em breve</p>
        </div>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <>
      {/* Main image */}
      <div
        className="relative rounded-2xl overflow-hidden h-72 md:h-96 bg-zinc-900 cursor-zoom-in"
        onClick={() => setLightbox(true)}
      >
        <SmartImage
          src={images[current]}
          alt={`${alt} - imagem ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <ZoomIn size={12} /> {current + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? "border-orange-500" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <SmartImage src={img} alt={`thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
            onClick={() => setLightbox(false)}
          >
            <X size={24} />
          </button>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
          <div
            className="relative w-full max-w-4xl h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage
              src={images[current]}
              alt={`${alt} ampliado`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-6 text-zinc-400 text-sm">{current + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}
