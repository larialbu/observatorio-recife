"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Operacao from "./(embarque)/operacao";
import AenaPage from "./(aena)/aena";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";
import { sameKeys } from "@/utils/filters/@features/sameKeys";

const PortosPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, filters, setData } = useDashboard();
  const [porto, setPorto] = useState([] as any);
  const [activeTab, setActiveTab] = useState("geral");
  const router = useRouter();

  const defaultData: any = {
    atracacao: [],
    carga: [],
    coords: [],
    dictionaries: { 
      atracacao: [], 
      carga: [], 
      origem: [], 
      destino: [], 
      mercado: [] 
    },
    rawData: { 
      atracacao: [], 
      carga: [] 
    },
    charts: { 
      portos: [],
    },
    passageiros: {
      current: [],
      past: []
    }
  };

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
      if (data?.atracacao) {
        setPorto({
          ...data,
          atracacao: data?.atracacao?.filteredData,
          carga: data?.carga,
        });

      } else {
        setPorto(defaultData);
      }

    }, [data]);
  
    if (Object.keys(porto).length === 0) {
      setPorto(defaultData);
    }

    if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    if (!data) {
      return <div className="text-center text-gray-600">Carregando dados...</div>;
    }

    if (isLoading) {
      return <LoadingScreen />;
    }

    switch (activeTab) {
      case "geral":
        return <Geral data={porto} months={getMonths(filters, true)} />;
      case "operacao":
        return <Operacao data={porto} months={getMonths(filters)} year={getYearSelected(filters)} />;
      case "comparativo":
        return <Comparativo data={porto} rawData={porto.rawData} year={getYearSelected(filters)} months={getMonths(filters)}   />;
      case "passageiro":
        return <AenaPage />;
      default:
        return <Geral data={porto} months={getMonths(filters, true)} />;
    }
};

  const handleNavigation = (tab: string) => {
    if (isLoading) return; 
    const currentTab = searchParams.get("tab");
    if (currentTab === "comparativo") {
      setData(null);
    }
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
};

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        Movimentação dos Portos
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
          Geral
        </button>
        <button
          onClick={() => handleNavigation("operacao")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "operacao"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Operação
        </button>
        <button
          onClick={() => handleNavigation("comparativo")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "comparativo"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Comparativo
        </button>
        <button
          onClick={() => handleNavigation("passageiro")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "passageiro"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Movimentaçaõ de Passageiros (Recife)
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default PortosPage;
