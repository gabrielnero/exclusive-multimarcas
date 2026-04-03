"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950 shadow-lg shadow-black/30">
      {/* Top bar */}
      <div className="bg-orange-500 text-zinc-950 text-xs font-semibold py-1.5 px-4 text-center">
        📍 Marau - RS &nbsp;|&nbsp; Seg a Sex: 08h–18h &nbsp;|&nbsp; Sáb: 08h–12h &nbsp;|&nbsp;
        <a href="tel:+5554334286811" className="underline">
          (54) 3342-8681
        </a>
      </div>

      <nav className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Exclusive Multimarcas"
            width={140}
            height={56}
            className="object-contain h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-zinc-300 hover:text-orange-400 text-sm font-medium transition-colors">
            Início
          </Link>
          <Link href="/estoque" className="text-zinc-300 hover:text-orange-400 text-sm font-medium transition-colors">
            Estoque
          </Link>
          <Link href="/sobre" className="text-zinc-300 hover:text-orange-400 text-sm font-medium transition-colors">
            Sobre Nós
          </Link>
          <Link href="/contato" className="text-zinc-300 hover:text-orange-400 text-sm font-medium transition-colors">
            Contato
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold text-sm px-4 py-2 rounded-full transition-all hover:scale-105"
          >
            <Phone size={15} />
            Fale Conosco
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-zinc-200 font-medium hover:text-orange-400">
            Início
          </Link>
          <Link href="/estoque" onClick={() => setMenuOpen(false)} className="text-zinc-200 font-medium hover:text-orange-400">
            Estoque
          </Link>
          <Link href="/sobre" onClick={() => setMenuOpen(false)} className="text-zinc-200 font-medium hover:text-orange-400">
            Sobre Nós
          </Link>
          <Link href="/contato" onClick={() => setMenuOpen(false)} className="text-zinc-200 font-medium hover:text-orange-400">
            Contato
          </Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-orange-500 text-zinc-950 font-bold py-3 rounded-full mt-2"
          >
            <Phone size={16} /> Fale Conosco
          </a>
        </div>
      )}
    </header>
  );
}
