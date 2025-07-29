"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";


import EmpresasAtivas from "./(empresas-ativas)/empresas-ativas";
import EmpresasAtivasRecife from "./(empresas-ativas-recife)/empresas-ativas-recife";
import EmpresasInativas from "./(empresas-inativas)/empresas-inativas";
import EmpresasAtivasInativas from "./(empresas-ativas-inativas)/empresas-ativas-inativas";
import EmpresasNaturezas from "./(empresas-naturezas)/empresas-naturezas";
import EmpresasClasses from "./(empresas-classes)/empresas-classes";
import ComparativoClasses from "./(comparativo-classes)/comparativo-classes";
import EmpresasAbertasFechadas from "./(empresas-abertas-fechadas)/empresas-abertas-fechadas";
import EmpresasTempoAbertura from "./(empresas-tempo-abertura)/empresas-tempo-abertura";
import { getChartDataModel } from "@/functions/process_data/observatorio/empresas/getChartDataModel";

const EmpresasPage = () => {
  const { isLoading, data, filters } = useDashboard() as any;
  const [dataObjRawData, setDataObjRawData] = useState<any>({});
  const [dataObj, setDataObj] = useState<any>({});
  const [dataTest, setDataTest] = useState<any>({});
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
    // if (!data?.id) return;
    // const idObjsRawData = ["empresas-empresas-naturezas", "empresas-empresas-classes"]
    // const idObjs = ['empresas-empresas-ativas-inativas',  ]      
    // const idTest = ["empresas-empresas-abertas-fechadas"]
    // const idArr = ["empresas-empresas-tempo-abertura", "empresas-empresas-ativas-recife", "empresas-empresas-ativas", "empresas-empresas-inativas"]

    // const handler = getChartDataModel(data, data.id);

    // if (handler) {
    //   if (idTest.includes(data.id)) {
    //     setDataTest(handler())
    //   } else if (idArr.includes(data.id)) {
    //     setDataArr(handler())
    //   } else if (idObjs.includes(data.id)) {
    //     setDataObj(handler())
    //   } else if (idObjsRawData.includes(data.id)) {
    //     setDataObjRawData(handler())
    //   }

    //   handler();
    //   clearInterval(intervalId);
    // } else {
    //   // Resetar os estados para o padrão se não encontrar ID
    //   setDataTest({ empresas: { ativas: [], inativas: [] }, rawData: { ativas: [], inativas: [] } });
    //   setDataArr({ empresas: [], rawData: [] });
    //   setDataObj({ ativas: [], inativas: [] });
    //   setDataObjRawData({ empresas: [], rawData: { mes: [], municipio: [] } });
    // }
  }, 50);

  return () => clearInterval(intervalId);
}, [data?.id, pathname]);
  
    if (isLoading) return <LoadingScreen />;

    
  const renderContent = () => {
    if (!data || !(dataArr?.length || dataObj?.ativas?.length || dataObjRawData?.empresas?.length || dataTest?.empresas?.ativas?.length || dataArr?.empresas?.length) ) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <EmpresasAtivasRecife
        data={dataArr} 
        year={getYearSelected(filters)} 
        />  
      // case "empresas-ativas":
      //   return <EmpresasAtivas
      //   data={dataArr} 
      //   year={getYearSelected(filters)} 
      //   /> 
      // case "empresas-inativas":
      //   return <EmpresasInativas
      //   data={dataArr} 
      //   year={getYearSelected(filters)} 
      //   /> 
      // case "empresas-ativas-inativas":
      //   return <EmpresasAtivasInativas
      //   data={dataObj} 
      //   year={getYearSelected(filters)} 
      //   />   
      // case "empresas-naturezas":
      //   return <EmpresasNaturezas
      //   data={dataObjRawData} 
      //   year={getYearSelected(filters)} 
      //   />
      // case "empresas-classes":
      //   return <EmpresasClasses
      //   data={dataObjRawData} 
      //   year={getYearSelected(filters)} 
      //   />     
      // case "comparativo-empresas-classes":
      //   return <ComparativoClasses
      //   data={dataObjRawData} 
      //   year={getYearSelected(filters)} 
      //   />    
      // case "empresas-abertas-fechadas":
      //   return <EmpresasAbertasFechadas
      //   data={dataTest} 
      //   year={getYearSelected(filters)} 
      //   />       
      // case "empresas-tempo-abertura":
      //   return <EmpresasTempoAbertura
      //   data={dataArr} 
      //   year={getYearSelected(filters)} 
      //   />        
      default:
        return <EmpresasAtivasRecife 
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
        Empresas
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
          Panorama Empresas Ativas  
        </button>
        <button
          onClick={() => handleNavigation("empresas-ativas")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "empresas-ativas"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Empresas Ativas  
        </button>
        <button
          onClick={() => handleNavigation("empresas-inativas")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "empresas-inativas"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Empresas Inativas  
        </button>
        <button
          onClick={() => handleNavigation("empresas-ativas-inativas")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "empresas-ativas-inativas"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Empresas Inativas X Ativas 
        </button>
        <button
          onClick={() => handleNavigation("empresas-naturezas")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "empresas-naturezas"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Empresas Naturezas
        </button>
        <button
          onClick={() => handleNavigation("empresas-classes")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "empresas-classes"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Ativas Geral NE
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default EmpresasPage;
