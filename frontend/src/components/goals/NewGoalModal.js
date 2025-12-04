"use client";

import { useState } from "react";

export default function NewGoalModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    final_value: "",
    current_value: "",
    end_date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/v1/goals/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        final_value: form.final_value.replace(",", "."),
        current_value: form.current_value.replace(",", "."),
      }),
    });

    if (!response.ok) {
      alert("Erro ao criar meta");
      return;
    }

    await onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-nubank-card p-8 rounded-xl w-[420px] border border-purple-900/40 shadow-xl shadow-black/40">

        <h2 className="text-2xl font-bold text-white mb-6">Nova Meta</h2>

        <div className="mb-4">
          <label className="text-sm text-purple-300">Nome da Meta</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
            placeholder="Ex.: Comprar carro"
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
              placeholder="0,00"
            />
          </div>

          <div>
            <label className="text-sm text-purple-300">Já Atingido</label>
            <input
              name="current_value"
              value={form.current_value}
              onChange={handleChange}
              className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-purple-300">Prazo</label>
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
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-nubank-purple hover:bg-nubank-purple/80 rounded-lg text-white font-semibold"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
