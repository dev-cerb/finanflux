"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-color-dark text-white">

      <aside className="
        hidden md:flex flex-col 
        w-64 bg-color-card p-6 
        border-r border-purple-800/40 
        shadow-xl shadow-black/20
      ">
        <SidebarContent />
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 
          h-full w-64 bg-color-card p-6 
          border-r border-purple-800/40 shadow-xl shadow-black/20 
          transform transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent closeMenu={() => setOpen(false)} />
      </aside>

      <main className="flex-1 p-10 lg:p-14">

        <button
          className="md:hidden mb-6 text-3xl text-white"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        {children}
      </main>
    </div>
  );
}

function SidebarContent({ closeMenu }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-color-purple mb-10">
        FinanFlux
      </h1>

      <nav className="flex-1 space-y-2">
        <SidebarLink href="/dashboard" label="Dashboard" closeMenu={closeMenu} />
        <SidebarLink href="/transactions" label="Transações" closeMenu={closeMenu} />
        <SidebarLink href="/categories" label="Categorias" closeMenu={closeMenu} />
        <SidebarLink href="/debits" label="Dívidas" closeMenu={closeMenu} />
        <SidebarLink href="/goals" label="Metas" closeMenu={closeMenu} />
        <SidebarLink href="/profile" label="Perfil" closeMenu={closeMenu} />
        <SidebarLink href="/general-information" label="Informações" closeMenu={closeMenu} />
        <SidebarLink href="/ia-analysis" label="Análise de IA" closeMenu={closeMenu} />
      </nav>

      <p className="text-xs text-purple-300 mt-10">FinanFlux</p>
    </>
  );
}

function SidebarLink({ href, label, closeMenu }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => closeMenu?.()}
      className={`
        block px-3 py-2 rounded-lg transition-all font-medium
        ${active 
          ? "bg-color-purple/30 text-white border border-purple-400/30 shadow-md shadow-purple-900/30" 
          : "text-purple-200 hover:bg-color-purple/10 hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  );
}
