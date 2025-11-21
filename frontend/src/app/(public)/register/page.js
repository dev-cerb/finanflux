"use client";

import InputField from "@/app/components/inputField";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = (event) => {
    event.preventDefault();
    const data = {
      user: event.target.user.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      email: event.target.email.value
    };

    if (data.password !== data.confirmPassword) {
      console.log("Erro: As senhas não coincidem");
      return;
    }

    console.log("Cadastro:", JSON.stringify(data));

    router.push("/");
  };

  return (
    <main className="pageRoot">
      <div className="pageContent">
        <h1 className="brand">FinanFlux</h1>

        <div className="form">
          <form onSubmit={handleRegister} className="formInner">
            <InputField label="Usuário:" id="user" name="user" required />
            <InputField label="Senha:" id="password" name="password" type="password" required />
            <InputField label="Confirmar senha:" id="confirmPassword" name="confirmPassword" type="password" required />
            <InputField label="Email:" id="email" name="email" type="email" required />
            <button type="submit" className="btn primary">Registrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}