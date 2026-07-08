"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { CombustiveisDataResult } from "@/@types/observatorio/@data/combustiveisData";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

import Comparativo from "./(comparativo)/comparativo";
import Estadual from "./(estadual)/estadual";
import Geral from "./(geral)/geral";
import Municipal from "./(municipal)/municipal";
import Regional from "./(regional)/regional";

const TABS = [
  { key: "geral",       label: "ANP GERAL",    gradient: "from-orange-500 to-orange-700" },
  { key: "comparativo", label: "COMPARATIVO",  gradient: "from-blue-500 to-blue-700" },
  { key: "regional",    label: "REGIONAL",     gradient: "from-green-500 to-green-700" },
  { key: "estadual",    label: "ESTADUAL",     gradient: "from-purple-500 to-purple-700" },
  { key: "municipal",   label: "MUNICIPAL",    gradient: "from-red-500 to-red-700" },
];

const CombustiveisPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoading, data, filters } = useDashboard();
  const [activeTab, setActiveTab] = useState("geral");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab("geral");
      router.replace("?tab=geral");
    }
  }, [searchParams]);

  const handleNavigation = (tab: string) => {
    router.replace(`?tab=${tab}`);
  };

  const year = getYearSelected(filters);
  const municipio = filters?.additionalFilters?.find((f) => f.label === "MUNICÍPIO")?.selected?.[0];
  const combustiveisData = data as CombustiveisDataResult | null;

  const renderContent = () => {
    if (!combustiveisData) return <div className="text-center text-gray-600 dark:text-gray-400 mt-12">Carregando dados...</div>;

    switch (activeTab) {
      case "geral":
        return <Geral data={combustiveisData?.geral} year={year} />;
      case "comparativo":
        return <Comparativo data={combustiveisData?.comparativo} year={year} municipio={municipio} />;
      case "regional":
        return <Regional data={combustiveisData?.regional} />;
      case "estadual":
        return <Estadual data={combustiveisData?.estadual} />;
      case "municipal":
        return <Municipal data={combustiveisData?.municipal} />;
      default:
        return <Geral data={combustiveisData?.geral} year={year} />;
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide dark:text-gray-200">
        Combustíveis — ANP
      </h1>

      {/* Abas */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {TABS.map(({ key, label, gradient }) => (
          <button
            key={key}
            onClick={() => handleNavigation(key)}
            className={`px-6 py-3 rounded-lg flex-1 sm:flex-none min-w-[160px] max-w-[220px] text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
              activeTab === key
                ? `bg-gradient-to-r ${gradient} text-white`
                : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default CombustiveisPage;
