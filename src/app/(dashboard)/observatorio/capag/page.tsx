"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";


import { getChartDataModelTributos } from "@/functions/process_data/observatorio/tributos/getChartDataModelTributos";
import CapagGeral from "./(geral)/geral";
import { getChartDataModelCapag } from "@/functions/process_data/observatorio/capag/getChartDataModelCapag";
// import ItbiContribuintes from "./(itbi-contribuintes)/itbi-contribuintes";
// import ItbiAvaliacoes from "./(itbi-avaliacoes)/itbi-avaliacoes";
// import ItbiPesquisa from "./(itbi-pesquisa)/itbi-pesquisa";
// import IptuContribuintes from "./(iptu-contribuintes)/iptu-contribuintes";
// import IptuValores from "./(iptu-valores)/iptu-valores";
// import IptuPesquisa from "./(iptu-pesquisa)/iptu-pesquisa";

const CapagPage = () => {
  const { isLoading, data, filters } = useDashboard() as any;
  const [dataArr, setDataArr] = useState<any>({});
  const [activeTab, setActiveTab] = useState("geral");

  const pathname = usePathname();
  const searchParams = useSearchParams();
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
    if (!data?.id) return;
    const idCapag = ["capag-geral"]
    const idITBI = ["tributos-itbi"] 
    const idIPTU = ["tributos-iptu"] 

    const handler = getChartDataModelCapag(data, data.id);

    if (handler) {
      if (idCapag.includes(data.id)) {
        setDataArr(handler())
      } else if (idCapag.includes(data.id)) {
        setDataArr(handler())
      }  
      
      handler();
      clearInterval(intervalId);
    } else {
      // Resetar os estados para o padrão se não encontrar ID
      // mudar isso, tem q tuer o past tb 
      setDataArr({ capag: [], current: [] });
    }

  }, 50);

  return () => clearInterval(intervalId);
}, [data, data?.id, pathname]);
  
    if (isLoading) return <LoadingScreen />;

    
  const renderContent = () => {
    if (!data || !(dataArr?.capag?.length || dataArr?.empresas?.length) ) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }
// CapagGeral
    switch (activeTab) {
      case "geral":
        return <CapagGeral
        data={dataArr} 
        year={getYearSelected(filters)} 
        />  
    //   case "itbi-avaliacoes":
    //     return <ItbiAvaliacoes
    //     data={dataArr} 
    //     year={getYearSelected(filters)} 
    //     /> 
    //   case "itbi-pesquisa":
    //     return <ItbiPesquisa
    //     data={dataArr} 
    //     year={getYearSelected(filters)} 
    //     /> 
    //   case "iptu-contribuintes":
    //     return <IptuContribuintes
    //     data={dataArr} 
    //     year={getYearSelected(filters)} 
    //     /> 
    //   case "iptu-valores":
    //     return <IptuValores
    //     data={dataArr} 
    //     year={getYearSelected(filters)} 
    //     /> 
    //   case "iptu-pesquisa":
    //     return <IptuPesquisa
    //     data={dataArr} 
    //     year={getYearSelected(filters)} 
    //     /> 
      default:
        return <CapagGeral 
        data={dataArr} 
        year={getYearSelected(filters)} 
        />
    }
  };

  const handleNavigation = async (tab: string) => {
    router.replace(`?tab=${tab}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
       <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide dark:text-gray-200">
        Tributos
      </h1>
      
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        <button
          onClick={() => handleNavigation("geral")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "geral"
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          ITBI Contribuintes
        </button>
        {/* <button
          onClick={() => handleNavigation("itbi-avaliacoes")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "itbi-avaliacoes"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          ITBI Avaliações  
        </button>
        <button
          onClick={() => handleNavigation("itbi-pesquisa")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "itbi-pesquisa"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        > 
 
          ITBI Pesquisa 
        </button>
        <button
          onClick={() => handleNavigation("iptu-contribuintes")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "iptu-contribuintes"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          IPTU Contribuintes
        </button>
        <button
          onClick={() => handleNavigation("iptu-valores")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "iptu-valores"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          IPTU Valores
        </button>
        <button
          onClick={() => handleNavigation("iptu-pesquisa")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "iptu-pesquisa"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          IPTU Pesquisa
        </button> */}
      </div>
      {renderContent()}
    </div>
  );
};

export default CapagPage;
