"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { X, Loader2, ImagePlus, AlertCircle } from "lucide-react";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

// Resize + convert to base64 (fallback when Vercel Blob not configured)
async function compressToBase64(file: File, maxWidth = 800, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height / width) * maxWidth);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas indisponível")); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Erro ao ler imagem"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}

// Upload to Vercel Blob via our API route
async function uploadToBlob(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  } catch {
    return null;
  }
}

// Try Cloudinary if configured
async function uploadToCloudinary(file: File): Promise<string | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) return null;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", "exclusive-multimarcas");
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: fd });
    if (!res.ok) return null;
    const d = await res.json();
    return d.secure_url ?? null;
  } catch {
    return null;
  }
}

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (imageFiles.length === 0) return;

      setUploading(true);
      setError(null);

      try {
        const results = await Promise.all(
          imageFiles.map(async (file) => {
            // 1. Tentar Cloudinary
            const fromCloudinary = await uploadToCloudinary(file);
            if (fromCloudinary) return fromCloudinary;

            // 2. Tentar Vercel Blob
            const fromBlob = await uploadToBlob(file);
            if (fromBlob) return fromBlob;

            // 3. Fallback: base64 comprimido (baixa resolução para caber no banco)
            return compressToBase64(file, 700, 0.65);
          })
        );

        const validUrls = results.filter(Boolean) as string[];
        if (validUrls.length === 0) {
          setError("Nenhuma imagem foi processada.");
          return;
        }
        onChange([...value, ...validUrls]);
      } catch (err) {
        console.error("Erro no upload:", err);
        setError("Erro ao processar imagem. Tente novamente.");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange]
  );

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    const updated = [...value];
    [updated[from], updated[to]] = [updated[to], updated[from]];
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {/* Upload area */}
      <label
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all ${
          dragOver
            ? "border-yellow-400 bg-yellow-50"
            : uploading
            ? "border-slate-200 bg-slate-50 cursor-wait"
            : "border-slate-300 hover:border-yellow-400 bg-slate-50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Loader2 size={24} className="animate-spin text-yellow-500" />
            <span className="text-sm font-medium">Enviando imagens...</span>
            <span className="text-xs text-slate-400">Aguarde, não feche a página</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
              <ImagePlus size={20} className="text-slate-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">
                Arraste fotos ou <span className="text-yellow-600">clique para selecionar</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, WebP · Múltiplas imagens aceitas</p>
            </div>
          </div>
        )}
      </label>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div
              key={`${i}-${url.slice(-10)}`}
              className="relative group aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200"
            >
              {url.startsWith("data:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt={`Imagem ${i + 1}`} className="w-full h-full object-cover" />
              ) : (
                <Image
                  src={url}
                  alt={`Imagem ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                  unoptimized
                />
              )}
              {i === 0 && (
                <span className="absolute top-1 left-1 bg-yellow-500 text-zinc-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  CAPA
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="bg-white text-slate-700 text-xs px-2 py-1 rounded font-bold hover:bg-slate-100"
                  >
                    ←
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <p className="text-xs text-slate-400">
          {value.length} imagem{value.length !== 1 ? "s" : ""} · A primeira será a capa · Arraste ← para reordenar
        </p>
      )}
    </div>
  );
}
