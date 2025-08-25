"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

import CapagGeral from "./(geral)/geral";
import { getChartDataModel } from "@/functions/process_data/observatorio/getChartDataModel";


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

    const handler = getChartDataModel(data, data.id);

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
    switch (activeTab) {
      case "geral":
        return <CapagGeral
        data={dataArr} 
        year={getYearSelected(filters)} 
        />  
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
        Capag
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
          Geral
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default CapagPage;
