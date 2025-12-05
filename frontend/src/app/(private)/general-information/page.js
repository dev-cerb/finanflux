"use client";

import { useState, useEffect } from "react";
import useGeneralInfo from "@/hooks/useGeneralInformation";

export default function GeneralInformationPage() {
  const { info, loading, error, reload } = useGeneralInfo();
  const [saving, setSaving] = useState(false);

  const [salary, setSalary] = useState("");
  const [limit, setLimit] = useState("");

  if(typeof window !== "undefined"){
    const token = localStorage.getItem("token");
  }

  useEffect(() => {
    if (info) {
      setSalary(info.salary || "");
      setLimit(info.limit || "");
    }
  }, [info]);

  if (loading) return <p className="text-white">Carregando...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  const createGeneralInfo = async () => {
    setSaving(true);

    const response = await fetch("http://localhost:8000/api/v1/general-information/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salary,
        limit,
      }),
    });

    if (!response.ok) {
      alert("Erro ao criar informações gerais");
    }

    await reload();
    setSaving(false);
  };

  const updateGeneralInfo = async () => {
    setSaving(true);

    const response = await fetch(
      `http://localhost:8000/api/v1/general-information/${info.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salary,
          limit,
        }),
      }
    );

    if (!response.ok) {
      alert("Erro ao atualizar informações");
    }

    await reload();
    setSaving(false);
  };

  return (
    <div className="text-white space-y-10">

      <h1 className="text-4xl font-bold text-color-purple">
        Informações Gerais
      </h1>

      <div className="bg-color-card p-6 rounded-xl border border-purple-900/40 shadow-lg shadow-black/30">

        <label className="block text-purple-300 mb-1">Salário mensal</label>
        <input
          type="number"
          step="0.01"
          className="w-full p-3 rounded bg-purple-950 border border-purple-800 text-white mb-4"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label className="block text-purple-300 mb-1">Limite de gastos mensal</label>
        <input
          type="number"
          step="0.01"
          className="w-full p-3 rounded bg-purple-950 border border-purple-800 text-white mb-4"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        {!info ? (
          <button
            onClick={createGeneralInfo}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-color-purple hover:bg-color-purple/80 font-bold text-white"
          >
            {saving ? "Salvando..." : "Criar Informações"}
          </button>
        ) : (
          <button
            onClick={updateGeneralInfo}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-color-purple hover:bg-color-purple/80 font-bold text-white"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        )}

      </div>
    </div>
  );
}
