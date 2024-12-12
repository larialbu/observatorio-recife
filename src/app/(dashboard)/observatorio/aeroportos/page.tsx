"use client";

import React, { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";

// IMPORTE AQUI NOVAS GUIAS 
import Geral from "./(geral)/geral";
//import Estatisticas from "./(estatisticas)/estatisticas";

const AeroportosPage = () => {
  const { year } = useDashboard();
  const [data, setData] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("geral"); // ESTADO INICIAL DA GUIA

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const aeroportoService = new AeroportoData(year);

      try {
        const fetchedData = await aeroportoService.fetchProcessedData();
        setData(fetchedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Erro ao buscar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const renderContent = () => {
    switch (activeTab) {
      case "geral":
        return <Geral data={data} year={year} />;
      case "embarque":
        return "oi";
      default:
        return <Geral data={data} year={year} />;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Movimentação de Aeroportos
      </h1>

      {/* Navegação entre guias */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("geral")}
          className={`px-4 py-2 rounded ${
            activeTab === "geral" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Resumo Geral
        </button>
        <button
          onClick={() => setActiveTab("embarque")}
          className={`px-4 py-2 rounded ${
            activeTab === "embarque" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Estatísticas
        </button>
        {/* VÁ COLOCANDO BOTÕES ONDE PRECISA */}
      </div>

      {/* RENDERIZAR CONTEÚDO COM BASE NA GUIA ATIVA */}
      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
