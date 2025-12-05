"use client";

import { useEffect } from "react";
import Link from "next/link";
import useDashboard from "@/hooks/useDashboard";
import useIA from "@/hooks/useIA";

export default function AiAnalysisPage() {
  const { data, loading, error } = useDashboard();
  const { analysis, loadingAI, errorAI, analyze } = useIA();

  // Gera análise automaticamente ao entrar na página
  useEffect(() => {
    if (data) analyze(data);
  }, [data]);

  if (loading) return <p className="text-white">Carregando...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="text-white space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-color-purple">
          Análise Inteligente
        </h1>
      </div>

      {loadingAI && (
        <div className="p-6 bg-purple-900/40 border border-purple-700 rounded-lg animate-pulse">
          A IA está analisando seus dados financeiros...Isso pode levar alguns minutos.
        </div>
      )}

      {errorAI && (
        <div className="p-6 bg-red-900/40 border border-red-600 rounded-lg">
          {errorAI}
        </div>
      )}

      {analysis && (
        <div className="p-6 bg-color-card rounded-xl border border-purple-900/40 shadow-lg shadow-black/20 whitespace-pre-line leading-relaxed">
          <h2 className="text-2xl font-bold text-purple-200 mb-4">
            Recomendações Inteligentes
          </h2>
          {analysis}
        </div>
      )}

      {!loadingAI && (
        <button
          onClick={() => analyze(data)}
          className="bg-color-purple hover:bg-color-purple/80 px-4 py-2 rounded-lg font-bold"
        >
          Gerar Nova Análise
        </button>
      )}

    </div>
  );
}
