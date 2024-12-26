"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";
import { aeroportoDataFilter } from "@/utils/filters/data_filters/aeroportoDataFilter";
import { aeroportosFilters } from "@/utils/filters/aeroportoFilters";
import { processFilters } from "@/utils/filters/@global/processFilters";

import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";

const AeroportosPage = () => {
  const { filters, setFilters } = useDashboard();
  const [data, setData] = useState([]) as any;
  const [filteredData, setFilteredData] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("geral");

  const prevYear = useRef<string | null>(null);
  const fetchingRef = useRef(false);

  useEffect(() => {
    const currentYear = filters.year || "2024";

    // Prevenindo múltiplos fetches simultâneos
    if (fetchingRef.current) {
      return;
    }

    // Se já buscamos dados para este ano, não busque novamente
    if (prevYear.current === currentYear && data.length > 0) {
      console.log("Fetch não executado, usando dados existentes.");
      return;
    }

    const fetchData = async () => {
      fetchingRef.current = true;
      setLoading(true);
      
      try {
        console.log("Fetching data for year:", currentYear);
        const aeroportoService = new AeroportoData(currentYear);
        const fetchedData = await aeroportoService.fetchProcessedData();
        setData(fetchedData);

        // Atualiza filtros dinamicamente apenas se necessário
        if (prevYear.current === null) {
          const dynamicFilters = processFilters(fetchedData, aeroportosFilters);
          setFilters((prevFilters: any) => ({
            ...prevFilters,
            additionalFilters: dynamicFilters.additionalFilters,
          }));
        }
        
        prevYear.current = currentYear;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Erro ao buscar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    };

    fetchData();
  }, [filters.year, setFilters, data.length]);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = aeroportoDataFilter(data, filters);
      setFilteredData(filtered);
    }
  }, [data, filters]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const renderContent = () => {
    switch (activeTab) {
      case "geral":
        return <Geral data={filteredData} />;
      case "comparativo":
        return (
          <Comparativo
            tempMuni={filters.additionalFilters[4]?.options}
            data={filteredData}
            year={filters.year ? filters.year : filters.years[filters.years.length-1]}
          />
        );
      case "embarque":
        return "Estatísticas de Embarque";
      default:
        return <Geral data={filteredData} />;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Movimentação de Aeroportos
      </h1>

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
          onClick={() => setActiveTab("comparativo")}
          className={`px-4 py-2 rounded ${
            activeTab === "comparativo"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Comparativo
        </button>
        <button
          onClick={() => setActiveTab("embarque")}
          className={`px-4 py-2 rounded ${
            activeTab === "embarque" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Estatísticas
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default AeroportosPage;