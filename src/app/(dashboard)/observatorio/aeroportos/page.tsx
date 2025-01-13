"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { aeroportoDataFilter } from "@/utils/filters/@data/aeroportoDataFilter";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import AenaPage from "./(aena)/aena";

const AeroportosPage = () => {
  const searchParams = useSearchParams();
  const { filters, isLoading, data } = useDashboard();
  const [activeTab, setActiveTab] = useState<string>("geral");
  const [filteredData, setFilteredData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  useEffect(() => {
    const applyFilters = () => {
      if (data.length > 0) {
        const filtered = aeroportoDataFilter(data[0]?.data || [], filters);
        setFilteredData(filtered);
        console.log("Dados filtrados:", filtered);
      }
    };

    applyFilters();
  }, [filters, data]);

  if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    switch (activeTab) {
      case "geral":
        return <Geral data={filteredData} />;
      case "comparativo":
        return <Comparativo data={filteredData} />;
      case "embarque":
        return <Embarque data={filteredData} />;
      case "aena":
        return <AenaPage />;
      default:
        return <Geral data={filteredData} />;
    }
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        Movimentação de Aeroportos
      </h1>
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        {/* Botões de navegação */}
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
