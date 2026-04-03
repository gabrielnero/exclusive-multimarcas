"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { X, Loader2, ImagePlus, AlertCircle } from "lucide-react";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

async function compressToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const tempUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(tempUrl);
      const MAX_W = 1200;
      let { width, height } = img;
      if (width > MAX_W) {
        height = Math.round((height / width) * MAX_W);
        width = MAX_W;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas indisponível")); return; }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };

    img.onerror = () => {
      URL.revokeObjectURL(tempUrl);
      reject(new Error("Erro ao ler imagem"));
    };
    img.src = tempUrl;
  });
}

async function uploadToServer(file: File): Promise<string | null> {
  const form = new FormData();
  form.append("file", file);
  try {
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.error === "BLOB_NOT_CONFIGURED") return null;
      throw new Error(data.error ?? "Falha no upload");
    }
    const data = await res.json();
    return data.url as string;
  } catch {
    return null;
  }
}

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (imageFiles.length === 0) return;

      setUploading(true);
      setWarning(false);

      try {
        const results = await Promise.all(
          imageFiles.map(async (file) => {
            // Tenta upload via Vercel Blob (CDN permanente)
            const serverUrl = await uploadToServer(file);
            if (serverUrl) return serverUrl;

            // Fallback: base64 comprimido (funciona sem CDN configurado)
            setWarning(true);
            return compressToBase64(file);
          })
        );

        const validUrls = results.filter(Boolean) as string[];
        onChange([...value, ...validUrls]);
      } catch (err) {
        console.error("Erro ao processar imagens:", err);
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

  const isBase64 = (url: string) => url.startsWith("data:");
  const isBlobUrl = (url: string) => url.startsWith("blob:");

  return (
    <div className="space-y-3">
      {warning && (
        <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-yellow-600" />
          <div>
            <strong>Armazenamento CDN não configurado.</strong> A imagem foi salva localmente no banco de dados.
            Para usar CDN permanente, configure o Vercel Blob Storage nas configurações do projeto.
          </div>
        </div>
      )}

      {/* Upload area */}
      <label
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all ${
          dragOver
            ? "border-yellow-400 bg-yellow-50"
            : "border-slate-300 hover:border-slate-400 bg-slate-50"
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
            <span className="text-sm font-medium">Enviando para CDN...</span>
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
              <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, WebP · Múltiplas imagens</p>
            </div>
          </div>
        )}
      </label>

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div
              key={i}
              className={`relative group aspect-video rounded-lg overflow-hidden bg-slate-100 border-2 ${
                isBlobUrl(url) ? "border-red-300" : "border-slate-200"
              }`}
            >
              {isBlobUrl(url) ? (
                <div className="flex flex-col items-center justify-center h-full gap-1 text-red-400 text-[10px] text-center p-1">
                  <AlertCircle size={18} />
                  URL expirada
                </div>
              ) : isBase64(url) ? (
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

              {i === 0 && !isBlobUrl(url) && (
                <span className="absolute top-1 left-1 bg-yellow-500 text-zinc-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  CAPA
                </span>
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {i > 0 && !isBlobUrl(url) && (
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
          {value.length} imagem{value.length !== 1 ? "s" : ""} · A primeira será a capa
          {value.some(isBlobUrl) && (
            <span className="text-red-500 ml-1">· Remova as imagens com erro e faça upload novamente</span>
          )}
        </p>
      )}
    </div>
  );
}
