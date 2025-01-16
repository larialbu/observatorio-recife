"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import AenaPage from "./(aena)/aena";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonthRecent } from "@/utils/filters/@global/getMonthRecent";
import { getMonths } from "@/utils/filters/@global/getMonths";

const AeroportosPage = () => {
  const { isLoading, data, filters } = useDashboard();
  const [anac, setAnac] = useState([]);
  const [activeTab, setActiveTab] = useState("geral");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") || "geral";
    setActiveTab(tab);
  }, []);

  useEffect(() => {
      console.log("Dados recebidos:", data);
  
      if (data) {
        // Extraindo os dados de passageiros e cargas
        const anacData = data.geral || {};
  
        setAnac(anacData.filteredData || []);
  
        console.log("Dados filtrados - Anac:", anac);
        console.log(filters.additionalFilters[4]);
      }
    }, [data]);

  const renderContent = () => {
    if (!data) {
      return <LoadingScreen />;
    }

    switch (activeTab) {
      case "geral":
        return <Geral 
          data={anac || []}
          year={getYearSelected(filters)}
          months={getMonths(filters, 1)}
        />;
        //FAVOR, EDITAR ESTE TOCOMPARE PARA SER SETTADO COM BASE EM DATA PARA DEPOIS SÓ PRECISAR SETAR O FILTRO DA TAB COMO
        // DEFAULTFILTERS E CONSEGUIR PASSAR SOMENTE O ANO.
      case "comparativo":
        return <Comparativo
          toCompare={filters?.additionalFilters[4]?.options || []}
          data={anac || []} 
          year={getYearSelected(filters)}
          months={getMonths(filters, 1)}
        />;
      case "embarque":
        return <Embarque 
          data={anac || []}
          toCompare={filters.additionalFilters[4]?.selected}
          monthRecent={getMonthRecent(filters, 1)}
        />;
      case "aena":
        return <AenaPage />;
      default:
        return <Geral 
        data={anac || []}
        year={getYearSelected(filters)}
        months={getMonths(filters, 1)}
        />;
    }
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="p-6 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Movimentação de Aeroportos
        </h1>
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          {["geral", "comparativo", "embarque", "aena"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleNavigation(tab)}
              className={`px-6 py-3 rounded-lg text-lg font-semibold ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
            { /* Caprichozinho para colocar aena estilizado */}
              { tab.charAt(0).toUpperCase() + tab.slice(1) === "Aena" ? (
                  <i>AENA</i>
                  ) : (
                  tab.charAt(0).toUpperCase() + tab.slice(1)
              )}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
    </Suspense>
  );
};

export default AeroportosPage;
