"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

import ComparativoMed from "./(comparativo-med)/comparativo-med";
import ComparativoMov from "./(comparativo-mov)/comparativo-mov";
import Media from "./(media)/media";
import Movimentacao from "./(movimentacao)/movimentacao";
import Salario from "./(salario)/salario";
import Saldo from "./(saldo)/saldo";

const MicroCagedPage = () => {
  const { isLoading, data, filters } = useDashboard() as any;
  const [microCaged, setMicroCaged] = useState<any>([]);
  const [microCagedMedia, setMicroCagedMedia] = useState<any>([]);
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
        
        if (data?.id === 'empregos-micro-caged' as 'porto') {
          const microCagedData = data?.microCaged || [];

          setMicroCaged(microCagedData.filteredData);

          clearInterval(intervalId);
        } else {
            setMicroCaged([]);
          }

        if (data?.id === 'empregos-micro-caged-media' as 'porto') {
          // const microCagedData = data?.microCaged || [];
          const microCagedMediaData = { current: data?.microCaged?.current?.filteredData || [], past: data?.microCaged?.past?.filteredData || [] };

          setMicroCagedMedia(microCagedMediaData);

          clearInterval(intervalId);
        } else {
            setMicroCagedMedia({ current: [], past: [] });
          }
      }, 50);
  
      return () => clearInterval(intervalId);
    }, [data, pathname]);
  
    if (isLoading) return <LoadingScreen />;

    
  const renderContent = () => {
    if (!data || !(microCaged?.length || microCagedMedia?.current?.length) ) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <Movimentacao
        data={microCaged} 
        year={getYearSelected(filters)} 
        />  
      case "saldo":
        return <Saldo
        data={microCaged} 
        year={getYearSelected(filters)} 
        /> 
      case "media":
        return <Media
        data={microCaged} 
        year={getYearSelected(filters)} 
        /> 
      case "comparativo-mov":
        return <ComparativoMov
        data={microCaged} 
        year={getYearSelected(filters)} 
        /> 
      case "comparativo-med":
        return <ComparativoMed
        data={microCagedMedia} 
        year={getYearSelected(filters)} 
        /> 
      case "salario":
        return <Salario
        data={microCaged} 
        year={getYearSelected(filters)} 
        /> 
      default:
        return <Movimentacao 
        data={microCaged} 
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
        Microdados (CAGED)
      </h1>
      
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
      <Link
          href={'empregos?tab=geral'}
          className={`px-6 py-3 rounded-lg flex items-center justify-center flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "caged"
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Caged
        </Link>
        <button
          onClick={() => handleNavigation("geral")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "geral"
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Movimentações
        </button>
        <button
          onClick={() => handleNavigation("saldo")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "saldo"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Saldo
        </button>
        <button
          onClick={() => handleNavigation("media")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "media"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Salário Médio
        </button>
        <button
          onClick={() => handleNavigation("comparativo-mov")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "comparativo-mov"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Movimentação Comparativo
        </button>
        <button
          onClick={() => handleNavigation("comparativo-med")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "comparativo-med"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Salário Médio Comparativo
        </button>
        <button
          onClick={() => handleNavigation("salario")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "salario"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Comparação CBO
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default MicroCagedPage;
