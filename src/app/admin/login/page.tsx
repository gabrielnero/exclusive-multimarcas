"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-white font-black text-2xl uppercase tracking-wide block">
            Exclusive
          </span>
          <span className="text-yellow-400 text-xs font-bold tracking-[0.4em] uppercase">
            Multimarcas · Admin
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-7">
          <h1 className="text-slate-900 font-bold text-xl mb-1">Entrar no painel</h1>
          <p className="text-slate-400 text-sm mb-6">Acesse com suas credenciais de administrador.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@exclusive.com"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold py-3 rounded-lg transition-all disabled:opacity-60 mt-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4">
            Acesso restrito a administradores
          </p>
        </div>
      </div>
    </div>
  );
}
