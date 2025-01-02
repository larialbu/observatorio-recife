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
        console.log("Fetching data for year:", currentYear);
        const aeroportoService = new AeroportoData(currentYear);
        const fetchedData = await aeroportoService.fetchProcessedData();
        setData(fetchedData);

        // Atualiza filtros dinamicamente apenas se necessário
        if (prevYear.current === null) {
          const dynamicFilters = processFilters(fetchedData, aeroportosFilters);
          console.log("dynamicFilters -> ", dynamicFilters);
          setFilters((prevFilters: any) => ({
            ...prevFilters,
            additionalFilters: dynamicFilters.additionalFilters,
          }));
        }

        prevYear.current = currentYear;

        console.log("-> ->", filters);
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

  console.log("-> ->", filters);

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
            toCompare={filters.additionalFilters[4]?.selected}
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
            toCompare={filters.additionalFilters[4]?.selected}
          />
        );
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
          Embarque/Desembarque
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
