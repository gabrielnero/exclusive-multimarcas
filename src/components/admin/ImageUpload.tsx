"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImagePlus } from "lucide-react";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      // Fallback: create a mock URL for development
      return URL.createObjectURL(file);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "exclusive-multimarcas");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.secure_url;
  };

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (imageFiles.length === 0) return;

      setUploading(true);
      try {
        const uploads = await Promise.all(imageFiles.map(uploadToCloudinary));
        const validUrls = uploads.filter(Boolean) as string[];
        onChange([...value, ...validUrls]);
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
            <span className="text-sm">Enviando imagens...</span>
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
            <div key={i} className="relative group aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={url}
                alt={`Imagem ${i + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
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
          {value.length} imagem{value.length !== 1 ? "s" : ""} · A primeira será a capa
        </p>
      )}
    </div>
  );
}
