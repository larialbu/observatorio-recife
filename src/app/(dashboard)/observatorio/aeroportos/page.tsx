"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getMonths } from "@/utils/filters/@global/getMonths";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

import AenaPage from "./(aena)/aena";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import Geral from "./(geral)/geral";


const AeroportosPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, filters } = useDashboard();
  const [anac, setAnac] = useState<AnacGeralHeaders[]>([]);
  const [activeTab, setActiveTab] = useState("geral");
  const router = useRouter();

  useEffect(() => {
      const tab = searchParams.get("tab");
      if (tab && tab !== activeTab) {
        setActiveTab(tab);
      } else if (!tab) {
        setActiveTab('geral');
        router.replace(`?tab=geral`);
      }
    }, [searchParams, activeTab, router]);

  useEffect(() => {
      const intervalId = setInterval(() => {
        
        if (data) {
          if (data?.id === "anac") {
            setAnac(data.geral?.filteredData || []);
          }
          
          clearInterval(intervalId);
        }
      }, 50);
  
      return () => clearInterval(intervalId);
    }, [data]);
  
    if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    if (!data || !anac) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <Geral 
          data={anac || []}
          rawData={data?.id === "anac" ? data.geral?.rawData || [] : []}
          year={getYearSelected(filters)}
          months={getMonths(filters)}
        />;
        //FAVOR, EDITAR ESTE TOCOMPARE PARA SER SETTADO COM BASE EM DATA PARA DEPOIS SÓ PRECISAR SETAR O FILTRO DA TAB COMO
        // DEFAULTFILTERS E CONSEGUIR PASSAR SOMENTE O ANO.
      case "comparativo":
        return <Comparativo
          data={anac || []} 
          year={getYearSelected(filters)}
          months={getMonths(filters)}
        />;
      case "embarque":
        return <Embarque 
          data={anac || []}
          toCompare={filters.additionalFilters[4]?.selected}
        />;
      case "aena":
        return <AenaPage months={getMonths(filters)} />;
      default:
        return <Geral 
        data={anac || []}
        rawData={data?.id === "anac" ? data.geral?.rawData || [] : []}
        year={getYearSelected(filters)}
        months={getMonths(filters)}
        />;
    }
  };

  const handleNavigation = async (tab: string) => {
    router.replace(`?tab=${tab}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide dark:text-gray-200">
        Movimentação de Aeroportos
      </h1>
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        {/* Botões de navegação */}
        <button
          onClick={() => handleNavigation("geral")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "geral"
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Resumo Geral
        </button>
        <button
          onClick={() => handleNavigation("comparativo")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "comparativo"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Comparativo
        </button>
        <button
          onClick={() => handleNavigation("embarque")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "embarque"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Embarque/Desembarque
        </button>
        <button
          onClick={() => handleNavigation("aena")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "aena"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
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
