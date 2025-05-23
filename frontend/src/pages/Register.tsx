import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Falha ao registrar");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          className="w-full mb-4 px-3 py-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-6 px-3 py-2 border rounded"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Cadastrar
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">Já tem conta?</span>{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Entrar
          </Link>
        </div>
      </form>
    </div>
  );
}