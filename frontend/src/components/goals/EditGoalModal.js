"use client";

import { useState } from "react";

export default function EditGoalModal({ item, onClose, onUpdated }) {

  const [form, setForm] = useState({
    name: item.name,
    final_value: item.final_value,
    current_value: item.current_value,
    end_date: item.end_date,
  });

  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);

    const response = await fetch(
      `http://localhost:8000/api/v1/goals/${item.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          final_value: form.final_value.replace(",", "."),
          current_value: form.current_value.replace(",", "."),
        }),
      }
    );

    if (!response.ok) {
      alert("Erro ao atualizar a meta");
      setSaving(false);
      return;
    }

    await onUpdated();
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta meta?")) return;

    const response = await fetch(
      `http://localhost:8000/api/v1/goals/${item.id}/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      alert("Erro ao excluir meta");
      return;
    }

    await onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-color-card p-8 rounded-xl w-[420px] border border-purple-900/40 shadow-xl shadow-black/40">

        <h2 className="text-2xl font-bold text-white mb-6">
          Editar Meta
        </h2>

        <div className="mb-4">
          <label className="text-sm text-purple-300">Nome da Meta</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-purple-300">Valor Final</label>
            <input
              name="final_value"
              value={form.final_value}
              onChange={handleChange}
              className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
            />
          </div>

          <div>
            <label className="text-sm text-purple-300">Atual</label>
            <input
              name="current_value"
              value={form.current_value}
              onChange={handleChange}
              className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-purple-300">Prazo Final</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
          />
        </div>

        <div className="flex justify-between mt-4">

          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold"
          >
            Excluir
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-color-purple hover:bg-color-purple/80 rounded-lg text-white font-semibold"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
