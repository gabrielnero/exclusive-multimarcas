"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu } from "lucide-react";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/veiculos": "Veículos",
  "/admin/veiculos/novo": "Novo Veículo",
  "/admin/leads": "Leads",
  "/admin/configuracoes": "Configurações",
};

export default function AdminHeader({ newLeadsCount = 0 }: { newLeadsCount?: number }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const title =
    Object.entries(TITLES)
      .reverse()
      .find(([key]) => pathname.startsWith(key))?.[1] ?? "Admin";

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
      {/* Mobile: logo + menu */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <span className="text-slate-900 font-black text-sm uppercase">Exclusive Admin</span>
        </div>
        <h1 className="hidden md:block text-slate-800 font-bold text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {newLeadsCount > 0 && (
          <Link href="/admin/leads" className="relative">
            <Bell size={18} className="text-slate-500 hover:text-slate-800 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {newLeadsCount > 9 ? "9+" : newLeadsCount}
            </span>
          </Link>
        )}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-zinc-900">
              {session?.user?.name?.[0]?.toUpperCase() ?? "A"}
            </span>
          </div>
          <span className="text-sm text-slate-600 hidden sm:block">
            {session?.user?.name ?? "Admin"}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="text-slate-400 hover:text-red-500 transition-colors"
          title="Sair"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
