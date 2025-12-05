"use client";

import { useState } from "react";
import { apiPost } from "@/services/api";

export default function useIA() {
  const [analysis, setAnalysis] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState(null);

  async function analyze(data) {
    setLoadingAI(true);
    setErrorAI(null);
    setAnalysis(null); // limpa análise anterior

    try {
      const json = await apiPost("/ai/analyze/", data);
      setAnalysis(json.analysis);
    } catch (err) {
      setErrorAI("Erro ao gerar análise da IA.");
    }

    setLoadingAI(false);
  }

  return {
    analysis,
    loadingAI,
    errorAI,
    analyze,
  };
}
