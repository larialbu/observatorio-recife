"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";
import { geralAccFunction } from "@/functions/process_data/observatorio/empregos/rais/demografia/geralFuncition";
import Demografia from "./(demografia)/demografia";
import Desligamento from "./(desligamento)/desligamento";

const RaisPage = () => {
  const { isLoading, data, filters } = useDashboard();
  const [rais, setRais] = useState({});
  const [activeTab, setActiveTab] = useState("geral");

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
        
        if (data?.rais) {
          const raisData = data?.rais || {};

          setRais({
            ativ: raisData.ativ.filteredData,
            noAtiv: raisData.noAtiv.filteredData
          });

          clearInterval(intervalId);
        } else {
            setRais({
                ativ: [],
                noAtiv: []
              });
          }
      }, 50);
  
      return () => clearInterval(intervalId);
    }, [data]);
  
    if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    if (!data) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <Demografia
        data={rais} 
        year={getYearSelected(filters)} 
        />  
      case "desligamento":
        return <Desligamento 
        data={rais} 
        year={getYearSelected(filters)} 
        />
      case "embarque":
        return <Demografia 
        data={rais} 
        year={getYearSelected(filters)} 
        />
      case "rais":
        return <Demografia 
        data={rais} 
        year={getYearSelected(filters)} 
        />
        default:
        return <Demografia 
        data={rais} 
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
       <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        RAIS
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
          Demográfia
        </button>
        <button
          onClick={() => handleNavigation("desligamento")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "desligamento"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Desligamento
        </button>
        <button
          onClick={() => handleNavigation("embarque")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "embarque"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Embarque/Desembarque
        </button>
        <button
          onClick={() => handleNavigation("rais")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "rais"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <i>RAIS</i>
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default RaisPage;
