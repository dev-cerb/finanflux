"use client";

import Link from "next/link";
import InputField from "../components/inputField";

export default function Home() {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      user: event.target.user.value,
      password: event.target.password.value
    };
    console.log("Login:", JSON.stringify(data));
  };
  
  return (
    <main className="pageRoot">
      <div className="pageContent">
        <h1 className="brand">FinanFlux</h1>
        <div className="form">
          <form onSubmit={handleLogin} className="formInner">
            <InputField label="Usuário:" id="user" name="user" required />
            <InputField label="Senha:" id="password" name="password" type="password" required />
            <button type="submit" className="btn primary">Entrar</button>
          </form>
          <p className="muted">Novo por aqui ? <Link href="/register" className="link">Criar conta !</Link></p>
        </div>
      </div>
    </main>
  );
}