"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";

import Geral from "./(geral)/geral";
import Analitico from "./(analitico)/analitico";

import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";
import Comparativo from "./(comparativo)/comparativo";

const PibPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isLoading, data, filters } = useDashboard();

  const [activeTab, setActiveTab] = useState("geral");
  const [pibData, setPibData] = useState({} as any)

  const defaultData: any = {
    geral: [],
    current: [],
    past: [],
    rawDataCurrent: []
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
    if (data?.geral) {
      setPibData({
        geral: data?.geral?.filteredData,
        current: data?.current?.filteredData,
        past: data?.past?.filteredData,
        rawDataCurrent: data?.rawDataCurrent
      });

    } else {
      setPibData(defaultData);
    }

    }, [data]);

  const renderContent = () => {
    if (!data) {
      return <div className="text-center text-gray-600">Carregando dados...</div>;
    }

    switch (activeTab) {
      case "geral":
        return (
          <Geral
            data={pibData}
            year={getYearSelected(filters)}
            months={getMonths(filters)}
          />
        );
      case "analitico":
        return (
          <Analitico
            data={pibData}
            year={getYearSelected(filters)}
          />
        );
      case "comparativo":
        return <Comparativo
          data={pibData} 
          year={getYearSelected(filters)}
          // months={getMonths(filters)}
        />;
      default:
        return (
          <Geral
            data={pibData}
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
        PIB
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
          Geral
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
          onClick={() => handleNavigation("analitico")}
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

export default PibPage;
