"use client";

import { useEffect, useState } from "react";

export default function useGeneralInfo() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/v1/general-information/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao carregar informações gerais");
      }

      setInfo(resData.length > 0 ? resData[0] : null);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { info, loading, error, reload: load };
}
