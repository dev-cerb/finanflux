"use client";

import { BASE_URL } from "@/services/api";
import { useEffect, useState } from "react";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/profiles/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao carregar perfil");
      }

      setProfile(resData.length > 0 ? resData[0] : null);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { profile, loading, error, reload: load };
}
