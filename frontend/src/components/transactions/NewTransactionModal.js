"use client";

import { useState } from "react";
import useCategories from "@/hooks/useCategories";

export default function NewTransactionModal({ onClose, onCreated }) {
  const { data: categories } = useCategories();

  const [form, setForm] = useState({
    description: "",
    value: "",
    type_of_transaction: "entrada",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/v1/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        value: Number(form.value),
      }),
    });

    if (response.ok) {
      onCreated();
      onClose();
    } else {
      alert("Erro ao criar transação");
    }
  };

  return (
    <div className="
      fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center
    ">
      <div className="
        bg-nubank-card p-8 rounded-2xl 
        border border-purple-900/40 
        shadow-xl shadow-black/40 
        w-full max-w-md text-white
      ">
        <h2 className="text-2xl font-bold mb-6 text-nubank-purple">
          Nova Transação
        </h2>

        <form onSubmit={submit} className="space-y-5">

          <div>
            <label className="text-sm text-purple-200">Descrição</label>
            <input
              name="description"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-purple-950 border border-purple-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-purple-200">Valor</label>
            <input
              name="value"
              type="number"
              value={form.value}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-purple-950 border border-purple-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-purple-200">Tipo</label>
            <select
              name="type_of_transaction"
              value={form.type_of_transaction}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-purple-950 border border-purple-800 text-white"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-purple-200">Categoria</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-purple-950 border border-purple-800 text-white"
            >
              <option value="">Selecione...</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-purple-200">Data</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-purple-950 border border-purple-800 text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-purple-700/40 hover:bg-purple-700/60"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded bg-nubank-purple hover:bg-nubank-purpleLight font-bold"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
