"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";

import Geral from "./(geral)/geral";
import Analitico from "./(analitico)/analitico";

import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";
import { BalancaGeralData } from "@/@types/observatorio/@data/balancaComercialData";
import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

/**
 * Page de Balança Comercial
 * Agora usando o mesmo estilo que "AeroportosPage",
 * pegando `data` e `isLoading` diretamente do contexto
 * e deixando só a lógica de tabs e renderização local.
 */
const BalancaComercialPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [balanca, setBalanca] = useState<BalancaHeaders[]>([]);

  const { isLoading, data, filters } = useDashboard();

  const [activeTab, setActiveTab] = useState("geral");

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
          if (data?.id === "balanca") {
            const balancaData = data?.geral || {};
            setBalanca(balancaData?.filteredData || {});

          }

      }, [data]);

  // Conteúdo principal, dependendo da aba
  const renderContent = () => {
    // Se data ainda não estiver disponível,
    // podemos mostrar um pequeno aviso ou algo similar.
    if (!data || !balanca) {
      return <div className="text-center text-gray-600">Gerando gráficos...</div>;
    }

    switch (activeTab) {
      case "analitico":
        return (
          <Analitico
            // Exemplo: se "data.geral?.filteredData" serve pro analítico também
            data={balanca}
            year={getYearSelected(filters)}
          />
        );

      case "geral":
      default:
        return (
          <Geral
            data={balanca}
            year={getYearSelected(filters)}
            months={getMonths(filters)}
          />
        );
    }
  };

  const handleNavigation = async (tab: string) => {
    router.replace(`?tab=${tab}`);
  };

  // Se estiver carregando, exibimos Carregando
  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        Balança Comercial
      </h1>

      {/* Botões de navegação de aba */}
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        <button
          onClick={() => handleNavigation("geral")}
          className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            activeTab === "geral"
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Balança Comercial
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

export default BalancaComercialPage;
