"use client";
import { useEffect, useState } from "react";

export default function useCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/v1/categories/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erro ao carregar categorias");

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
