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
import Embarque from "./(embarque)/embarque";

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
        return (
          <Geral
            data={filteredData}
            year={
              filters.year
                ? filters.year
                : filters.years[filters.years.length - 1]
            }
          />
        );
      case "comparativo":
        return (
          <Comparativo
            toCompare={filters.additionalFilters[4]?.options}
            data={filteredData}
            year={
              filters.year
                ? filters.year
                : filters.years[filters.years.length - 1]
            }
          />
        );
      case "embarque":
        return (
          <Embarque
            toCompare={
              filters.additionalFilters[4]?.selected.length > 0
                ? filters.additionalFilters[4].selected
                : ["Recife"]
            }
            monthRecent={
              filters.additionalFilters[1]?.selected.length > 0
                ? undefined
                : +filters.additionalFilters[1].options[
                    filters.additionalFilters[1].options.length - 1
                  ]
            }
            data={filteredData}
            year={
              filters.year
                ? filters.year
                : filters.years[filters.years.length - 1]
            }
          />
        );
      default:
        return (
          <Geral
            data={filteredData}
            year={
              filters.year
                ? filters.year
                : filters.years[filters.years.length - 1]
            }
          />
        );
    }
  };

  return (
    <div className="p-6 min-h-screen ">
    <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
      Movimentação de Aeroportos
    </h1>

    <div className="flex justify-center gap-6 mb-8 flex-wrap">
      <button
        onClick={() => setActiveTab("geral")}
        className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
          activeTab === "geral"
            ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Resumo Geral
      </button>
      <button
        onClick={() => setActiveTab("comparativo")}
        className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
          activeTab === "comparativo"
            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Comparativo
      </button>
      <button
        onClick={() => setActiveTab("embarque")}
        className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
          activeTab === "embarque"
            ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Embarque/Desembarque
      </button>
    </div>

      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
