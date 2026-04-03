import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Sidebar from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: { default: "Admin | Exclusive Multimarcas", template: "%s · Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </SessionProvider>
  );
}
