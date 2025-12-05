"use client";

import { useState } from "react";

export default function EditDebtModal({ item, onClose, onUpdated, reload }) {
  const [name, setName] = useState(item.name);
  const [total, setTotal] = useState(item.total_value);
  const [paid, setPaid] = useState(item.current_value);
  const [due, setDue] = useState(item.due_date);

  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const save = async () => {
    setSaving(true);

    const response = await fetch(
      `http://localhost:8000/api/v1/debits/${item.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          total_value: total,
          current_value: paid,
          due_date: due,
        }),
      }
    );

    if (!response.ok) {
      alert("Erro ao atualizar dívida");
    } else {
      onUpdated();
      onClose();
    }

    setSaving(false);
  };

  const remove = async () => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    const response = await fetch(
      `http://localhost:8000/api/v1/debits/${item.id}/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      alert("Erro ao deletar dívida");
    } else {
      onUpdated();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-color-card p-6 rounded-xl w-full max-w-md space-y-4 border border-purple-900">
        <h2 className="text-xl font-bold text-white">Editar Dívida</h2>

        <input className="input bg-purple-950" value={name} onChange={e => setName(e.target.value)} />
        <input className="input bg-purple-950" type="number" value={total} onChange={e => setTotal(e.target.value)} />
        <input className="input bg-purple-950" type="number" value={paid} onChange={e => setPaid(e.target.value)} />
        <input className="input bg-purple-950" type="date" value={due} onChange={e => setDue(e.target.value)} />

        <div className="flex gap-3">
          <button onClick={remove} className="btn bg-red-600 w-full">Excluir</button>
          <button onClick={save} className="btn bg-color-purple w-full">
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
