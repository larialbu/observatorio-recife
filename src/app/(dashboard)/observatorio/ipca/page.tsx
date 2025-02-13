"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import Geral from "./(geral)/geral";

import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";
import Analitico from "./(analitico)/analitico";
import Grupos from "./(grupos)/grupos";

const AeroportosPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, filters } = useDashboard();
  const [anac, setAnac] = useState([]);
  const [anacRawData, setAnacRawData] = useState([]);
  const [activeTab, setActiveTab] = useState("geral");
  const router = useRouter();

  useEffect(() => {
      const tab = searchParams.get("tab");
      if (tab && tab !== activeTab) {
        setActiveTab(tab);
        
      }else if (!tab){
        setActiveTab('geral');
        router.replace(`?tab=${'geral'}`);
      }
    }, [searchParams, activeTab]);

  useEffect(() => {

    if (data) {
      // Extraindo os dados de passageiros e cargas
      const anacData = data.geral || {};
      // const anacRawData = data.rawData || {};

      setAnac(anacData.filteredData || []);
      setAnacRawData(anacData.rawData)

    }
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    if (!data) {
      return (
        <div className="text-center text-gray-600">Carregando dados...</div>
      );
    }

    switch (activeTab) {
      case "geral":
        return (
          <Geral
            data={anac || []}
            rawData={data?.geral?.rawData || []}
            year={getYearSelected(filters)}
            months={getMonths(filters)}
          />
        );
      case "grupos":
        return (
          <Grupos
            year={getYearSelected(filters)}
          />
        );

      case "analitico":
        return (
          <Analitico
            year={getYearSelected(filters)}
            // months={11}
          />
        );
      default:
        return (
          <Geral
            data={anac || []}
            rawData={data?.geral?.rawData || []}
            year={getYearSelected(filters)}
            months={getMonths(filters)}
          />
        );
    }
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        IPCA
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
          onClick={() => handleNavigation("grupos")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "grupos"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Por Grupos
        </button>
        <button
          onClick={() => handleNavigation("analitico")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "analitico"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
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

export default AeroportosPage;
