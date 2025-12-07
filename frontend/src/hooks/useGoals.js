"use client";

import { BASE_URL } from "@/services/api";
import { useState, useEffect } from "react";

export default function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGoals = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/goals/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) throw new Error("Erro ao carregar metas.");

      setGoals(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  return { goals, loading, error, reload: loadGoals };
}
