"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";

import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import Link from "next/link";
import Desemprego from "./(desemprego)/desemprego";

const EmpregosPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, filters } = useDashboard();
  const [caged, setCaged] = useState({});
  const [desemprego, setDesemprego] = useState({});
  const [activeTab, setActiveTab] = useState("geral");
  
  const pathname = usePathname();
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
        
        if (data?.caged) {
          setCaged({
            caged: data.caged.filteredData,
            municipios: data.municipios.filteredData
          });

          clearInterval(intervalId);
        } else {
          setCaged({
              caged: [],
              municipios: []
            });
        }

        if (data?.desemprego) {
          setDesemprego({
            desemprego: data.desemprego.filteredData,
            municipios: data.municipios.filteredData,
            trimestre: {
              municipiosTrimestre: data.trimestre.municipiosTrimestre.filteredData,
              municipiosTrimestrePast: data.trimestre.municipiosTrimestrePast.filteredData,
            },
          });

          clearInterval(intervalId);
        } else {
          setDesemprego({
              desemprego: [],
              municipios: [],
              trimestre: {
                municipiosTrimestre: [],
                municipiosTrimestrePast: [],
              },
            });
        }

      }, 50);
  
      return () => clearInterval(intervalId);
    }, [data, pathname]);
  
    if (isLoading) return <LoadingScreen />;


  const renderContent = () => {
    if (!data || !caged.caged || !caged.municipios || !desemprego.desemprego || !desemprego.municipios ) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <Geral 
          data={caged}
          year={getYearSelected(filters)}
          months={getMonths(filters)}
        />;
      case "comparativo":
        return <Comparativo
          data={caged} 
          year={getYearSelected(filters)}
        />;
      case "desemprego":
        return <Desemprego 
        data={desemprego}
        year={getYearSelected(filters)}
        months={getMonths(filters)}
        />;
      default:
        return <Geral 
        data={caged}
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
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        Variação e Atividade dos Empregos
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
          Resumo Geral
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
          onClick={() => handleNavigation("desemprego")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "desemprego"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Desemprego
        </button>  
        <Link
          href={'rais?tab=geral'}
          className={`px-6 py-3 rounded-lg flex items-center justify-center flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "rais"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <i>RAIS</i>
        </Link>
      </div>
      {renderContent()}
    </div>
  );
};

export default EmpregosPage;
