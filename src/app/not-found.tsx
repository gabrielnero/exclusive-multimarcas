import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-yellow-500 font-black text-8xl mb-4">404</p>
        <h1 className="text-2xl font-black text-zinc-900 mb-3">Página não encontrada</h1>
        <p className="text-zinc-500 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white font-bold px-6 py-3 rounded-full hover:bg-zinc-700 transition-all"
          >
            <ArrowLeft size={16} /> Voltar ao início
          </Link>
          <Link
            href="/estoque"
            className="inline-flex items-center gap-2 border-2 border-zinc-300 text-zinc-700 font-bold px-6 py-3 rounded-full hover:border-zinc-500 transition-all"
          >
            <Search size={16} /> Ver estoque
          </Link>
        </div>
      </div>
    </div>
  );
}
