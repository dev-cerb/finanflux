"use client";

import InputField from "@/components/inputField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      email: event.target.email.value,
    };

    if (data.password !== data.confirmPassword) {
      setError("As senhas não coincidem, verifique!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          email: data.email,
        }),
      });

      if (!response.ok) {
        const resData = await response.json();
        setError(resData.error || "Erro ao registrar usuário");
        return;
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
      return;
    }

    alert("Conta criada com sucesso!");
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-color-dark text-white px-4">
      <div className="w-full max-w-md bg-color-card p-8 rounded-2xl shadow-xl shadow-purple-900/40">
        
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-8 text-color-purple">
          Criar Conta
        </h1>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label htmlFor="username" className="block text-sm mb-1 text-purple-200">
              Usuário
            </label>
            <InputField id="username" name="username" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-purple-200">
              Senha
            </label>
            <InputField id="password" name="password" type="password" required />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm mb-1 text-purple-200">
              Confirmar senha
            </label>
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-purple-200">
              Email
            </label>
            <InputField id="email" name="email" type="email" required />
          </div>

          {/* Exibir erro */}
          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-color-purple hover:bg-color-purple/80 transition-colors py-2 rounded-lg font-bold"
          >
            Registrar
          </button>

        </form>

        <p className="text-center mt-6 text-purple-300 text-sm">
          Já tem conta?{" "}
          <Link href="/" className="text-color-purple font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
