"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import AenaPage from "./(aena)/aena";

const AeroportosPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data } = useDashboard();
  const [anac, setAnac] = useState([]);
  const [activeTab, setActiveTab] = useState("geral");
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  useEffect(() => {
      console.log("Dados recebidos:", data);
  
      if (data) {
        // Extraindo os dados de passageiros e cargas
        const anacData = data.geral || {};
  
        setAnac(anacData.filteredData || []);
  
        console.log("Dados filtrados - Anac:", anac);
      }
    }, [data]);
  
    if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    if (!data) {
      return <div className="text-center text-gray-600">Carregando dados...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <Geral data={anac || []} />;
      case "comparativo":
        return <Comparativo data={anac || []} />;
      case "embarque":
        return <Embarque data={anac || []} />;
      case "aena":
        return <AenaPage />;
      default:
        return <Geral data={data?.geral || []} />;
    }
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Movimentação de Aeroportos
      </h1>
      <div className="flex justify-center gap-6 mb-8">
        {["geral", "comparativo", "embarque", "aena"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleNavigation(tab)}
            className={`px-6 py-3 rounded-lg text-lg font-semibold ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
