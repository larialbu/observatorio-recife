"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { BalancaComercialData } from "@/@api/http/to-charts/bal_comercial/BalancaComercialData";
import { balancaComercialDataFilter } from "@/utils/filters/@data/balancaComercialDataFilter";
import { balancaComercialFilters } from "@/utils/filters/balancaComercialFilters";
import { processFilters } from "@/utils/filters/@global/processFilters";

import Geral from "./(geral)/geral";
import Analitico from "./(analitico)/analitico";
import { getMonthRecent } from "@/utils/filters/@global/getMonthRecent";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";

const BalancaComercialPage = () => {
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
        const balancaComercialService = new BalancaComercialData(currentYear);
        const fetchedData = await balancaComercialService.fetchProcessedData();
        setData(fetchedData);

        // Atualiza filtros dinamicamente apenas se necessário
        if (prevYear.current === null) {
          const dynamicFilters = processFilters(fetchedData, balancaComercialFilters);
          console.log("dynamicFilters -> ", dynamicFilters);
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
      const filtered = balancaComercialDataFilter(data, filters);
      console.log(filtered)
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
            year={getYearSelected(filters)}
            toCompare={filters.additionalFilters[4]?.selected}
            months={getMonths(filters, 0)}
          />
        );
        case "analitico":
        return (
          <Analitico
            toCompare={filters.additionalFilters[1]?.options}
            data={filteredData}
            year={
              getYearSelected(filters)
            }
            monthRecent={getMonthRecent(filters, 0)}
          />
        );
      default:
        return (
          <Geral
            data={filteredData}
            year={getYearSelected(filters)}
            toCompare={filters.additionalFilters[4]?.selected}
            months={getMonths(filters, 0)}
          />
        );
    }
  };

  return (
    <div className="p-6 min-h-screen ">
    <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
      Balança Comercial
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
        Balança Comercial
      </button>

      <button
        onClick={() => setActiveTab("analitico")}
        className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
          activeTab === "analitico"
            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Analítico
      </button>
    </div>

      {renderContent()}
    </div>
  );
};

export default BalancaComercialPage;
