import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

type Summary = {
  entradas: number;
  saidas: number;
  saldo: number;
};

export default function Dashboard() {
  const { logout, token } = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await api.get("/transactions/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch {
        logout();
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-blue-600">Tailwind Funcionando</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        {summary ? (
          <div className="space-y-4 text-lg">
            <div>Entradas: <span className="text-green-600 font-bold">€ {summary.entradas.toFixed(2)}</span></div>
            <div>Saídas: <span className="text-red-600 font-bold">€ {summary.saidas.toFixed(2)}</span></div>
            <div>Saldo: <span className="text-blue-700 font-bold">€ {summary.saldo.toFixed(2)}</span></div>
          </div>
        ) : (
          <div>Carregando...</div>
        )}
        <button
          className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </div>
  );
}