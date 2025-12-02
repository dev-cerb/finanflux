"use client";

import { useState, useEffect } from "react";

export default function CategoryModal({ item, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    budget: "",
  });

  // Preencher quando for edição
  useEffect(() => {
    if (item) {
      setForm({
        name: item.name ?? "",
        budget: item.budget ?? "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const url = item
      ? `http://localhost:8000/api/v1/categories/${item.id}/`
      : `http://localhost:8000/api/v1/categories/`;

    const method = item ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        budget: Number(form.budget),
      }),
    });

    if (response.ok) {
      onSaved();
      onClose();
    } else {
      alert("Erro ao salvar categoria");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-nubank-card p-8 rounded-2xl border border-purple-900/40 shadow-xl shadow-black/40 w-full max-w-md text-white">

        <h2 className="text-2xl font-bold mb-6 text-nubank-purple">
          {item ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        <form onSubmit={submit} className="space-y-5">

          {/* Nome */}
          <div>
            <label className="text-sm text-purple-200">Nome</label>
            <input
              name="name"
              value={form.name ?? ""}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-purple-950 border border-purple-800 text-white"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm text-purple-200">Limite mensal (R$)</label>
            <input
              type="number"
              name="budget"
              value={form.budget ?? ""}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-purple-950 border border-purple-800 text-white"
            />
          </div>

          {/* Botões */}
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
              {item ? "Salvar alterações" : "Criar categoria"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
