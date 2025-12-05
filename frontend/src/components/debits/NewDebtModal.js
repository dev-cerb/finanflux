"use client";

import { useState } from "react";

export default function NewDebitModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    total_value: "",
    current_value: "",
    due_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => { onCreate({
    ...form,
    total_value: form.total_value.replace(",", "."),
    current_value: form.current_value.replace(",", ".")
    });
    };


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-color-card p-8 rounded-xl w-[420px] border border-purple-900/40 shadow-xl shadow-black/40">

        <h2 className="text-2xl font-bold text-white mb-6">Nova Dívida</h2>

        <div className="mb-4">
          <label className="text-sm text-purple-300">Nome</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
            placeholder="Ex.: Empréstimo Banco..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-purple-300">Valor Total</label>
            <input
              name="total_value"
              value={form.total_value}
              onChange={handleChange}
              className="w-full mt-1 bg-purple-950 border border-purple-800 p-3 rounded text-white"
              placeholder="0,00"
            />
          </div>

          <div>
            <label className="text-sm text-purple-300">Já Pago</label>
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
          <label className="text-sm text-purple-300">Vencimento</label>
          <input
            type="date"
            name="due_date"
            value={form.due_date}
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
            className="px-6 py-2 bg-color-purple hover:bg-color-purple/80 rounded-lg text-white font-semibold"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
