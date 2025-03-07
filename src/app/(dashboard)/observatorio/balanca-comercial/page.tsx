"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";

import Geral from "./(geral)/geral";
import Analitico from "./(analitico)/analitico";

import { getMonthRecent } from "@/utils/filters/@global/getMonthRecent";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";
import { getMonths } from "@/utils/filters/@global/getMonths";

/**
 * Page de Balança Comercial
 * Agora usando o mesmo estilo que "AeroportosPage",
 * pegando `data` e `isLoading` diretamente do contexto
 * e deixando só a lógica de tabs e renderização local.
 */
const BalancaComercialPage = () => {
  const router = useRouter();

  // Pegamos do contexto: isLoading e data (já filtrados).
  const { isLoading, data, filters } = useDashboard();

  // Tab ativa. Pode ser "geral" ou "analitico".
  const [activeTab, setActiveTab] = useState("geral");

  // Sempre que "tab" mudar na URL, atualizamos localmente
  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") || "geral";
      setActiveTab(tab);
    }, []);

  // Conteúdo principal, dependendo da aba
  const renderContent = () => {
    // Se data ainda não estiver disponível,
    // podemos mostrar um pequeno aviso ou algo similar.
    if (!data) {
      return <LoadingScreen />;
    }

    // Obs.: assumindo que "data.geral" é onde estão os registros filtrados
    // ou outra estrutura. Ajuste se for "data.filteredData", etc.
    const geralData = data.geral?.filteredData || [];
    console.log(filters.additionalFilters)

    switch (activeTab) {
      case "analitico":
        return (
          <Analitico
            // Exemplo: se "data.geral?.filteredData" serve pro analítico também
            data={geralData}
            year={getYearSelected(filters)}
            monthRecent={getMonthRecent(filters, 0)}
            toCompare={filters.additionalFilters?.[1]?.options || []}
          />
        );

      case "geral":
      default:
        return (
          <Geral
            data={geralData}
            year={getYearSelected(filters)}
            // Ajuste: se "toCompare" é outro array, mude esse index [4]
            toCompare={filters.additionalFilters?.[4]?.selected}
            months={getMonths(filters, 0)}
          />
        );
    }
  };

  // Botão para navegar entre "geral" e "analitico"
  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    // Atualiza a URL sem recarregar a página
    router.replace(`?tab=${tab}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="p-6 min-h-screen ">
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
    </Suspense>
  );
};

export default BalancaComercialPage;
