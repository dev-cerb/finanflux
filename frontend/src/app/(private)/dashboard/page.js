"use client";

import useDashboard from "../../../hooks/useDashboard";
import SummaryCard from "@/components/dashboard/SumaryCard";
import CategoryBar from "@/components/dashboard/CategoryBar";
import LimitWarning from "@/components/dashboard/LimitWarning";

export default function DashboardPage() {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const {
    username,
    salary_formatted,
    entries_formatted,
    expenses_formatted,
    total_income_formatted,
    balance_formatted,
    categories
  } = data;

  return (
    <div className="text-white space-y-12">


      <h1 className="text-4xl font-bold tracking-tight text-nubank-purple">
        Olá, {username} 👋
      </h1>
      
      <LimitWarning limit={data.limit} expenses={data.expenses} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <SummaryCard title="Salário" value={salary_formatted} />
        <SummaryCard title="Entradas" value={entries_formatted} />
        <SummaryCard title="Saídas" value={expenses_formatted} />
        <SummaryCard title="Renda Total" value={total_income_formatted} />
        <SummaryCard title="Saldo" value={balance_formatted} />
        <SummaryCard
          title="Perfil"
          value={
            data.investor_type
              ? data.investor_type.charAt(0).toUpperCase() + data.investor_type.slice(1)
              : "Não definido"
          }
        />

      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-purple-300 tracking-tight">Categorias</h2>

        {categories.length === 0 ? (
          <div className="bg-nubank-card p-6 rounded-xl border border-purple-900/40 shadow-lg shadow-black/20 text-purple-300">
            Nenhuma categoria cadastrada ainda.
          </div>
        ) : (
          categories.map((cat, index) => (
            <CategoryBar
              key={index}
              name={cat.category}
              spent={cat.spent}
              budget={cat.budget}
            />
          ))
        )}
      </div>
    </div>
  );
}
