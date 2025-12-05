"use client";

import { useState } from "react";
import useTransactions from "@/hooks/useTransaction";
import TransactionItem from "@/components/transactions/TransactionItem";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import EditTransactionModal from "@/components/transactions/EditTransactionModal";

export default function TransactionsPage() {
  const { data, loading, error, reload } = useTransactions();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div className="text-white space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-color-purple">Transações</h1>

        <button
        onClick={() => setShowModal(true)}
        className="
            bg-color-purple
            hover:bg-color-purpleLight
            transition-all
            px-6 py-2 
            rounded-lg 
            font-bold text-white
        ">Nova Transação
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Lista */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="
            bg-color-card
            p-6 rounded-xl
            border border-purple-900/40 
            shadow-lg shadow-black/20 
            text-purple-300
          ">
            Nenhuma transação cadastrada ainda.
          </div>
        ) : (
          data.map((item) => <TransactionItem key={item.id} item={item} onClick={() => setEditing(item)} />)
        )}

        {showModal && (
        <NewTransactionModal
            onClose={() => setShowModal(false)}
            onCreated={reload}
        />
        )}

        {editing && (
        <EditTransactionModal
            transaction={editing}
            onClose={() => setEditing(null)}
            onUpdated={reload}
        />
        )}
      </div>
    </div>
  );
}
