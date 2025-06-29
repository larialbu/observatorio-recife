"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getMonths } from "@/utils/filters/@global/getMonths";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

import Analitico from "./(analitico)/analitico";
import Geral from "./(geral)/geral";
import Grupos from "./(grupos)/grupos";


const IpcaPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, filters } = useDashboard();
  const [ipca, setIpca] = useState<IpcaGeralHeaders[]>([]);
  const [ipcaRawData, setIpcaRawData] = useState<IpcaGeralHeaders[]>([]);
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
    if (data?.id === "ipca") {
      const ipcaData = data?.geral;
      setIpca(ipcaData?.filteredData || []);
      setIpcaRawData(ipcaData?.rawData || []);
    }

  }, [data]);

  const renderContent = () => {
    if (!data || !ipca || !ipcaRawData) {
      return (
        <div className="text-center text-gray-600">Construindo gráficos...</div>
      );
    }

    switch (activeTab) {
      case "geral":
        return <Geral
            data={ipca || {}}
            rawData={ipcaRawData || {}}
            months={getMonths(filters)}
          />
      case "grupos":
        return <Grupos />

      case "analitico":
        return <Analitico
            year={getYearSelected(filters)}
          />
      default:
        return <Geral
          data={ipca}
          rawData={ipcaRawData || {}}
          months={getMonths(filters)}
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
        IPCA
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
          onClick={() => handleNavigation("grupos")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "grupos"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Por Grupos
        </button>
        <button
          onClick={() => handleNavigation("analitico")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "analitico"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Analítico
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default IpcaPage;
