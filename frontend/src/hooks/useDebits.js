"use client";

import { BASE_URL } from "@/services/api";
import { useEffect, useState } from "react";

export default function useDebits() {
  const [debits, setDebits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/debits/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao carregar dívidas");
      }

      setDebits(resData);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { debits, loading, error, reload: load };
}
