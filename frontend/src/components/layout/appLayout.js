"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-nubank-dark text-white">

      <aside className="w-64 bg-nubank-card border-r border-purple-800/40 hidden md:flex flex-col p-6 shadow-xl shadow-black/20">
        
        
        <h1 className="text-2xl font-bold text-nubank-purple mb-10">
          FinanFlux
        </h1>

        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link href="/transactions" className="block p-2 rounded hover:bg-gray-100">Transações</Link>
          <Link href="/categories" className="block p-2 rounded hover:bg-gray-100">Categorias</Link>
          <Link href="/debits" className="block p-2 rounded hover:bg-gray-100">Dívidas</Link>
          <Link href="/goals" className="block p-2 rounded hover:bg-gray-100">Metas</Link>
          <Link href="/profile" className="block p-2 rounded hover:bg-gray-100">Perfil</Link>
          <Link href="/general-information" className="block p-2 rounded hover:bg-gray-100">Informações</Link>
        </nav>


        <p className="text-xs text-purple-300 mt-10">
          v1.0 — FinanFlux
        </p>
      </aside>

      <main className="flex-1 p-10 lg:p-14">{children}</main>
    </div>
  );
}

function SidebarLink({ href, label }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        block px-3 py-2 rounded-lg transition-all font-medium
        ${active 
          ? "bg-nubank-purple/30 text-white border border-purple-400/30 shadow-md shadow-purple-900/30" 
          : "text-purple-200 hover:bg-nubank-purple/10 hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  );
}