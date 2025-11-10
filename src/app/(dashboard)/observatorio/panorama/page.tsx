"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";

import Geral from "./(geral)/geral";
import { getChartDataModel } from "@/functions/process_data/observatorio/getChartDataModel";
import { NavBarHome } from "@/components/home/NavBarHome";


const AeroportosPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, filters } = useDashboard();
  const [anac, setAnac] = useState<any>({});
  const [aena, setAena] = useState<any>({});
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
      const intervalId = setInterval(() => {
        if (!data?.id) return 
        const anacId = ['anac']
        const aenaId = ['aena']

        const handler = getChartDataModel(data, data.id);

        if (handler) {
          if (anacId.includes(data?.id)) {
            setAnac(handler());
          } else if (aenaId.includes(data?.id)) {
            setAnac(handler());
          }
            setAnac(handler());

          handler()
          
          clearInterval(intervalId);
        } else {
          setAnac({ anac: [], rawData: { "MÊS": [], "AEROPORTO NOME": []}  });
          setAena({ passageiros: [], cargas: [], rawData: { passageiros: [], cargas: [] }  });
        }

      }, 50);
  
      return () => clearInterval(intervalId);
    }, [data]);
  
    if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    if (!data || !(anac?.anac || aena?.passageiros || data?.data)) {
      return <div className="text-center text-gray-600">Construindo gráficos...</div>;
    }

    switch (activeTab) {
      case "geral":
        return <Geral 
          data={anac || {}}
        />;
      default:
        return <Geral 
          data={anac || {}}
        />;
    }
  };

  const handleNavigation = async (tab: string) => {
    router.replace(`?tab=${tab}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
    <div className="bg-[#F7F8FA]/90 w-full min-h-screen fixed">
    </div>
     <div className="p-6 min-h-screen mt-48 z-10">
        <div className="-mt-20">
          <NavBarHome />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide dark:text-gray-200">
          Panorama do Recife
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
            Resumo Geral
          </button>
          
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-green-800 shadow-md rounded-lg px-4 py-3 mb-7 flex items-center justify-center">
          <div className="overflow-hidden">
            <div className="marquee">
              <p>
                O Observatório Econômico do Recife, iniciativa da Prefeitura em parceria com a Faculdade Senac, reúne dados abertos e análises
                sobre a economia local – Recife tem 1,49 milhão de habitantes (9º do Brasil e 3º do Nordeste) e sua Região Metropolitana
                soma 3,7 milhões (5ª maior do país) – É o 1º do Nordeste no Ranking Nacional de Competitividade dos Municípios – O PIB é de
                R$ 54,9 bilhões (1º de PE, 3º do NE e 19º do Brasil), com destaque para o setor de serviços (60% da economia) – Em Setembro/25:
                IPCA mensal de 0,56%, IPCA Acumulado no ano 3,64% e nos últimos 12 meses de 5,17% – Aeroporto do Recife com 821 mil passageiros
                (-2,70% vs 2024) e taxa de desemprego no menor nível para um 2º trimestre desde 2015 – O Recife gerou 1.956 novas vagas de trabalho,
                segundo dados divulgados pelo Novo Caged, relativo ao mês de agosto/2025, se destacando como primeira capital do nordeste em geração de
                vagas e top 6 no Brasil – Banco Central manteve a Selic em 15% a.a. – O número de empresas ativas saltou 15% desde agosto/24,
                alcançando 191 mil – Maior PIB Per Capita entre as capitais do NE.
              </p>
            </div>
          </div>
        </div>


        {renderContent()}
      </div>   
    </>
  );
};

export default AeroportosPage;
