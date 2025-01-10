"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";
import { aeroportoDataFilter } from "@/utils/filters/@data/aeroportoDataFilter";

import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import AenaPage from "./(aena)/aena";
import { getMonthRecent } from "@/utils/filters/@global/getMonthRecent";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";

import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";

const AeroportosPage = () => {
  const { filters, setFilters, processAndSetFilters } = useDashboard();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]) as any;
  const [filteredData, setFilteredData] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("geral");

  const prevYear = useRef<string | null>(null);
  const fetchingRef = useRef(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    console.log(tab)
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  useEffect(() => {
    const currentYear = filters.year || "2024";

    if (fetchingRef.current) return;
    if (prevYear.current === currentYear && data.length > 0) return;

    const fetchData = async () => {
      fetchingRef.current = true;
      setLoading(true);

      try {
        const aeroportoService = new AeroportoData(currentYear);
        const fetchedData = await aeroportoService.fetchProcessedData();
        setData(fetchedData);

        if (prevYear.current === null) {
          processAndSetFilters(fetchedData, anacFilters);
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
  }, [filters.year, processAndSetFilters, data.length]);

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
            year={getYearSelected(filters)}
            months={getMonths(filters, 1)}
          />
        );
      case "comparativo":
        return (
          <Comparativo
            toCompare={filters.additionalFilters[4]?.options}
            data={filteredData}
            year={getYearSelected(filters)}
            months={getMonths(filters, 1)}
          />
        );
      case "embarque":
        return (
          <Embarque
            toCompare={filters.additionalFilters[4]?.selected}
            monthRecent={getMonthRecent(filters, 1)}
            data={filteredData}
          />
        );
      case "aena":
        return <AenaPage />;
      default:
        return (
          <Geral
            data={filteredData}
            year={getYearSelected(filters)}
            months={getMonths(filters, 1)}
          />
        );
    }
  };

  const handleNavigation = (tab: string) => {
    console.log('settando a tab:', tab)
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        Movimentação de Aeroportos
      </h1>

      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        <button
          onClick={() => handleNavigation("geral")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "geral"
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Resumo Geral
        </button>
        <button
          onClick={() => handleNavigation("comparativo")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "comparativo"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Comparativo
        </button>
        <button
          onClick={() => handleNavigation("embarque")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "embarque"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Embarque/Desembarque
        </button>
        <button
          onClick={() => handleNavigation("aena")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "aena"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <i>AENA</i>
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
