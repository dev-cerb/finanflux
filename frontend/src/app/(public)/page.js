"use client";

import Link from "next/link";
import InputField from "../../components/inputField";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        setError(resData.error || "Usuário ou senha inválidos");
        return;
      }

      localStorage.setItem("token", resData.access);

      router.push("/dashboard");
    } catch (err) {
      setError("Erro na conexão ao servidor");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-color-dark text-white px-4">
      {/* Card principal */}
      <div className="w-full max-w-md bg-color-card p-8 rounded-2xl shadow-xl shadow-purple-900/40">
        
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-8 text-color-purple">
          FinanFlux
        </h1>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Campo usuário */}
          <div>
            <label className="block text-sm mb-1 text-purple-200" htmlFor="username">
              Usuário
            </label>
            <InputField
              id="username"
              name="username"
              required
            />
          </div>

          {/* Campo senha */}
          <div>
            <label className="block text-sm mb-1 text-purple-200" htmlFor="password">
              Senha
            </label>
            <InputField
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

          {/* Erro */}
          {error && (
            <p className="text-red-400 text-sm font-medium">
              {error}
            </p>
          )}

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-color-purple hover:bg-color-purple/80 transition-colors py-2 rounded-lg font-bold text-white"
          >
            Entrar
          </button>
        </form>

        {/* Link Criar conta */}
        <p className="text-center mt-6 text-purple-300 text-sm">
          Novo por aqui?{" "}
          <Link
            href="/register"
            className="text-color-purple font-semibold hover:underline"
          >
            Criar conta!
          </Link>
        </p>
      </div>
    </main>
  );
}
