"use client";

import InputField from "@/app/components/inputField";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null)

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      email: event.target.email.value
    };

    if (data.password !== data.confirmPassword) {
      setError("As senhas não coincidem, verifique!");
      return;
    }

    try{
      const response = await fetch('http://localhost:8000/api/v1/users/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          email: data.email
        })
      });

      if(!response.ok){
        const resData = await response.json();
        setError(resData.error || "Erro ao registrar usuário");
        return;
      }
    }catch(err){
      setError("Erro ao conectar ao servidor")
    }

    alert("Conta criada com sucesso!");
    router.push("/");
  };

  return (
    <main className="pageRoot">
      <div className="pageContent">
        <h1 className="brand">FinanFlux</h1>

        <div className="form">
          <form onSubmit={handleRegister} className="formInner">
            <InputField label="Usuário:" id="username" name="username" required />
            <InputField label="Senha:" id="password" name="password" type="password" required />
            <InputField label="Confirmar senha:" id="confirmPassword" name="confirmPassword" type="password" required />
            <InputField label="Email:" id="email" name="email" type="email" required />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="btn primary">Registrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}