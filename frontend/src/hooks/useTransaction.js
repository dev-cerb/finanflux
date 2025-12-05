"use client";
import { BASE_URL } from "@/services/api";
import { useEffect, useState } from "react";

export default function useTransactions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/transactions/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar transações");

      const list = await response.json();
      setData(list);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { data, loading, error, reload: load };
}
