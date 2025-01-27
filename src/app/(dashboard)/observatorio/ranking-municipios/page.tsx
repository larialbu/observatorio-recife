"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";

import Geral from "./(geral)/geral";
import Dimensao from "./(dimensao)/dimensao";
import Pilar from "./(pilar)/pilar";
import Indicador from "./(indicador)/indicador";

const AeroportosPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, filters } = useDashboard();
  const [anac, setAnac] = useState([]);
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
    console.log("Dados recebidos:", data);

    if (data) {
      // Extraindo os dados de passageiros e cargas
      const anacData = data.geral || {};

      setAnac(anacData.filteredData || []);

      console.log("Dados filtrados - Anac:", anac);
      console.log(filters?.additionalFilters[4]);
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
            year={getYearSelected(filters)}
            rawData={data?.geral?.rawData || []}
          />
        );
      case "dimensao":
        return (
          <Dimensao
            data={anac || []}
            year={getYearSelected(filters)}
            rawData={data?.dimensao?.rawData || []}
          />
        );
      case "pilar":
        return (
          <Pilar
            data={anac || []}
            year={getYearSelected(filters)}
            rawData={data?.pilar?.rawData || []}
          />
        );
        case "indicador":
          return (
            <Indicador
              data={anac || []}
              year={getYearSelected(filters)}
              rawData={data?.indicador?.rawData || []}
            />
          );
      default:
        return (
          <Geral
            data={anac || []}
            year={getYearSelected(filters)}
            rawData={data?.geral.rawData}
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
      <h1 className="fixed top-2 right-10 text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide z-50">
        Ranking Geral de Competitividade
      </h1>
      <div className="fixed flex justify-center gap-6 mb-8 flex-wrap z-50 top-16 right-10">
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
          onClick={() => handleNavigation("dimensao")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "dimensao"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Dimensão
        </button>
        <button
          onClick={() => handleNavigation("pilar")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "pilar"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Pilar
        </button>
        <button
          onClick={() => handleNavigation("indicador")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "indicador"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
           Indicador 
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
