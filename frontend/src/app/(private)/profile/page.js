"use client";

import { useState } from "react";
import useProfile from "@/hooks/useProfile";

export default function ProfilePage() {
  const { profile, loading, error, reload } = useProfile();
  const [saving, setSaving] = useState(false);

  const [type, setType] = useState(profile?.type_of_investor || "conservador");

  if (loading) return <p className="text-white">Carregando...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  const token = localStorage.getItem("token");

  const createProfile = async () => {
    setSaving(true);

    const response = await fetch("http://localhost:8000/api/v1/profiles/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type_of_investor: type }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        alert("Erro ao criar perfil: " + errorText);
    }

    await reload();
    setSaving(false);
  };

  const updateProfile = async () => {
    setSaving(true);

    const response = await fetch(
      `http://localhost:8000/api/v1/profiles/${profile.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type_of_investor: type }),
      }
    );

    if (!response.ok) {
      alert("Erro ao atualizar perfil");
    }

    await reload();
    setSaving(false);
  };

  return (
    <div className="text-white space-y-10">

      <h1 className="text-4xl font-bold text-nubank-purple">
        Perfil de Investidor
      </h1>

      <div className="bg-nubank-card p-6 rounded-xl border border-purple-900/40 shadow-lg shadow-black/30">

        <label className="block text-purple-300 mb-2">
          Selecione seu tipo de investidor
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-purple-950 border border-purple-800 p-3 rounded text-white"
        >
          <option value="conservador">Conservador</option>
          <option value="moderado">Moderado</option>
          <option value="agressivo">Agressivo</option>
        </select>

        <div className="mt-4 p-4 bg-purple-900/40 rounded-lg border border-purple-800">
        <h2 className="text-lg font-semibold text-nubank-purple mb-2">
            Sobre o seu perfil
        </h2>

        {type === "conservador" && (
            <p className="text-purple-200">
            Você prefere segurança e estabilidade. Indicada para quem evita riscos e
            prioriza a proteção do patrimônio.
            </p>
        )}

        {type === "moderado" && (
            <p className="text-purple-200">
            Você busca equilíbrio entre segurança e retorno. Ideal para quem aceita
            alguma variação para obter melhores resultados.
            </p>
        )}

        {type === "agressivo" && (
            <p className="text-purple-200">
            Você busca alto potencial de crescimento, mesmo que isso envolva maior
            risco e volatilidade no curto prazo.
            </p>
        )}
        </div>


        {!profile && (
          <button
            onClick={createProfile}
            disabled={saving}
            className="mt-6 px-6 py-2 rounded-lg bg-nubank-purple hover:bg-nubank-purple/80 font-bold text-white"
          >
            {saving ? "Salvando..." : "Criar Perfil"}
          </button>
        )}

        {profile && (
          <button
            onClick={updateProfile}
            disabled={saving}
            className="mt-6 px-6 py-2 rounded-lg bg-nubank-purple hover:bg-nubank-purple/80 font-bold text-white"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        )}

      </div>
    </div>
  );
}
