"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";


import ComparativoMed from "./(comparativo-med)/comparativo-med";
import EmpresasAtivas from "./(empresas-ativas)/empresas-ativas";
import EmpresasAtivasRecife from "./(empresas-ativas-recife)/empresas-ativas-recife";
import EmpresasInativas from "./(empresas-inativas)/empresas-inativas";
import Salario from "./(salario)/salario";
import EmpresasAtivasInativas from "./(empresas-ativas-inativas)/empresas-ativas-inativas";
import EmpresasNaturezas from "./(empresas-naturezas)/empresas-naturezas";
import EmpresasClasses from "./(empresas-classes)/empresas-classes";
import ComparativoClasses from "./(comparativo-classes)/comparativo-classes";
import EmpresasAbertasFechadas from "./(empresas-abertas-fechadas)/empresas-abertas-fechadas";

const EmpresasPage = () => {
  const { isLoading, data, filters } = useDashboard() as any;
  const [dataArr, setDataArr] = useState<any>([]);
  const [dataObjRawData, setDataObjRawData] = useState<any>({});
  const [dataObj, setDataObj] = useState<any>({});
  const [dataTest, setDataTest] = useState<any>({});
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
        const idArrays = ["empresas-empresas-ativas-recife", "empresas-empresas-ativas", "empresas-empresas-inativas"]
        const idObjsRawData = ["empresas-empresas-naturezas", "empresas-empresas-classes"]
        const idObjs = ['empresas-empresas-ativas-inativas',  ]      
        const idTest = ["empresas-empresas-abertas-fechadas"]

        if (idArrays.includes(data?.id)) {
          // aqui vai para de ser somente arrays { empresas: [], rawData: [] }

          const empresasDataObj = data?.empresas || [];

          setDataArr(empresasDataObj.filteredData);

          clearInterval(intervalId);
        } else {
            setDataArr([]);
          }
        
        if (idTest.includes(data?.id)) {
          const empresasDataObj = { 
            empresas: { ativas: data?.empresas?.ativas?.filteredData || [], inativas: data?.empresas?.inativas?.filteredData || []}, 
            rawData: { ativas: data?.rawData?.ativas || [], inativas: data?.rawData?.inativas || [] }
          };

          setDataTest(empresasDataObj);

          clearInterval(intervalId);
        } else {
            setDataTest({ empresas: { ativas: [], inativas: []}, rawData: [] });
          }

        if (idObjs.includes(data?.id)) {
          // const microCagedData = data?.microCaged || [];
          // mudar isso aqui
          const empresasDataObj = { ativas: data?.empresas?.ativas?.filteredData || [], inativas: data?.empresas?.inativas?.filteredData || [] };
          
          setDataObj(empresasDataObj);

          clearInterval(intervalId);
        } else {
            setDataObj({ ativas: [], inativas: [] });
          }

        if (idObjsRawData.includes(data?.id)) {
          const empresasDataObj = { empresas: data?.empresas?.empresas?.filteredData || [], rawData: { mes: data?.empresas?.rawData?.mes?.filteredData || [], municipio: data?.empresas?.rawData?.municipio?.filteredData || [] } };
          
          console.log('empresasAdtaObj', empresasDataObj)

          setDataObjRawData(empresasDataObj);

          clearInterval(intervalId);
        } else {
            setDataObjRawData({ empresas: [], rawData: {mes: [], municipio: []} });
          }          
      }, 50);
  
      return () => clearInterval(intervalId);
    }, [data, pathname]);
  
    if (isLoading) return <LoadingScreen />;

    
  const renderContent = () => {
    console.log('DataOBJ', dataObj)
    if (!data || !(dataArr?.length || dataObj?.ativas?.length || dataObjRawData?.empresas?.length || dataTest?.empresas?.ativas?.length) ) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <EmpresasAtivasRecife
        data={dataArr} 
        year={getYearSelected(filters)} 
        />  
      case "empresas-ativas":
        return <EmpresasAtivas
        data={dataArr} 
        year={getYearSelected(filters)} 
        /> 
      case "empresas-inativas":
        return <EmpresasInativas
        data={dataArr} 
        year={getYearSelected(filters)} 
        /> 
      case "empresas-ativas-inativas":
        return <EmpresasAtivasInativas
        data={dataObj} 
        year={getYearSelected(filters)} 
        />   
      case "empresas-naturezas":
        return <EmpresasNaturezas
        data={dataObjRawData} 
        year={getYearSelected(filters)} 
        />
      case "empresas-classes":
        return <EmpresasClasses
        data={dataObjRawData} 
        year={getYearSelected(filters)} 
        />     
      case "comparativo-empresas-classes":
        return <ComparativoClasses
        data={dataObjRawData} 
        year={getYearSelected(filters)} 
        />    
      case "empresas-abertas-fechadas":
        return <EmpresasAbertasFechadas
        data={dataTest} 
        year={getYearSelected(filters)} 
        />        
        // "empresas-naturezas"
// empresas-abertas-fechadas

      // case "comparativo-mov":
      //   return <ComparativoMov
      //   data={microCaged} 
      //   year={getYearSelected(filters)} 
      //   /> 
      // case "comparativo-med":
      //   return <ComparativoMed
      //   data={microCagedMedia} 
      //   year={getYearSelected(filters)} 
      //   /> 
      // case "salario":
      //   return <Salario
      //   data={microCaged} 
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
        <button
          onClick={() => handleNavigation("comparativo-empresas-classes")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "comparativo-empresas-classes"
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Compartivo Ativas Geral NE
        </button>
        <button
          onClick={() => handleNavigation("empresas-abertas-fechadas")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "empresas-abertas-fechadas"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          Empresas Abertas e Fechadas  
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default EmpresasPage;
