"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Car,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/veiculos", label: "Veículos", icon: Car },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div>
          <span className="text-white font-black text-base uppercase tracking-wide">
            Exclusive
          </span>
          <span className="text-yellow-400 text-[10px] font-bold tracking-[0.3em] uppercase block -mt-0.5">
            Multimarcas · Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-slate-800 text-white"
                  : "hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Icon size={17} className={active ? "text-yellow-400" : ""} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-slate-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-slate-800 pt-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800/50 hover:text-white transition-all"
        >
          <ExternalLink size={17} /> Ver site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-red-900/30 hover:text-red-400 transition-all"
        >
          <LogOut size={17} /> Sair
        </button>
      </div>
    </aside>
  );
}
