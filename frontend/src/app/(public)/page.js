"use client";

import Link from "next/link";
import InputField from "../components/inputField";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      user: event.target.user.value,
      password: event.target.password.value
    };
    
    try{
      const response = await fetch("http://localhost:8000/api/v1/login/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if(!response.ok){
        setError(resData.error || "Usuário ou senha inválidos");
        return;
      }

      localStorage.setItem("token", resData.access);

      router.push("/dashboard");
    }catch (err) {
      console.log(err);
      setError("Erro na conexão ao servidor")
    }
  };
  
  return (
    <main className="pageRoot">
      <div className="pageContent">
        <h1 className="brand">FinanFlux</h1>
        <div className="form">
          <form onSubmit={handleLogin} className="formInner">
            <InputField label="Usuário:" id="user" name="user" required />
            <InputField label="Senha:" id="password" name="password" type="password" required />

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="btn primary">Entrar</button>
          </form>
          <p className="muted">Novo por aqui ? <Link href="/register" className="link">Criar conta !</Link></p>
        </div>
      </div>
    </main>
  );
}