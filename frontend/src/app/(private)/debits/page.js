"use client";

import { useState } from "react";
import useDebits from "@/hooks/useDebits";
import DebtItem from "@/components/debits/DebtItem";
import NewDebtModal from "@/components/debits/NewDebtModal";
import EditDebtModal from "@/components/debits/EditDebtModal";

export default function DebitsPage() {
  const { debits, loading, error, reload } = useDebits();

  const [showNewModal, setShowNewModal] = useState(false);
  const [editing, setEditing] = useState(null);

  if (loading) return <p className="text-white">Carregando...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

    const handleCreateDebit = async (newDebit) => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/v1/debits/", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newDebit),
    });

    if (!response.ok) {
        console.log(response)
        alert("Erro ao criar dívida");
        return;
    }

    await reload();
    setShowNewModal(false);
    };

  return (
    <div className="text-white space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-nubank-purple">Minhas Dívidas</h1>
        <button 
          onClick={() => setShowNewModal(true)}
          className="bg-nubank-purple hover:bg-nubank-purple/80 px-4 py-2 rounded-lg font-bold"
        >
          Nova Dívida
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {debits.map((d) => (
          <DebtItem
            key={d.id}
            item={d}
            onEdit={() => setEditing(d)}
          />
        ))}
      </div>

      {showNewModal && (
        <NewDebtModal 
          onClose={() => setShowNewModal(false)} 
          onCreate={handleCreateDebit} 
        />
      )}

      {editing && (
        <EditDebtModal 
          item={editing}
          onClose={() => setEditing(null)}
          onUpdated={reload}
        />
      )}

    </div>
  );
}
