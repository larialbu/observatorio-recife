"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { TributosDataResult } from "@/@types/observatorio/@data/tributosData";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

import ItbiContribuintes from "./(itbi-contribuintes)/itbi-contribuintes";
import ItbiAvaliacoes from "./(itbi-avaliacoes)/itbi-avaliacoes";
import ItbiPesquisa from "./(itbi-pesquisa)/itbi-pesquisa";
import IptuContribuintes from "./(iptu-contribuintes)/iptu-contribuintes";
import IptuValores from "./(iptu-valores)/iptu-valores";
import IptuPesquisa from "./(iptu-pesquisa)/iptu-pesquisa";

const TABS = [
  { key: "itbi-contribuintes", label: "ITBI CONTRIBUINTES", gradient: "from-orange-500 to-orange-700" },
  { key: "itbi-avaliacoes",    label: "ITBI AVALIAÇÕES",    gradient: "from-blue-500 to-blue-700" },
  { key: "itbi-pesquisa",      label: "ITBI PESQUISA",      gradient: "from-green-500 to-green-700" },
  { key: "iptu-contribuintes", label: "IPTU CONTRIBUINTES", gradient: "from-purple-500 to-purple-700" },
  { key: "iptu-valores",       label: "IPTU VALORES",       gradient: "from-red-500 to-red-700" },
  { key: "iptu-pesquisa",      label: "IPTU PESQUISA",      gradient: "from-teal-500 to-teal-700" },
];

const TributosPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoading, data, filters } = useDashboard();
  const [activeTab, setActiveTab] = useState("itbi-contribuintes");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab("itbi-contribuintes");
      router.replace("?tab=itbi-contribuintes");
    }
  }, [searchParams]);

  const handleNavigation = (tab: string) => {
    router.replace(`?tab=${tab}`);
  };

  const year = getYearSelected(filters);
  const tributosData = data as TributosDataResult | null;

  const renderContent = () => {
    if (!tributosData) return <div className="text-center text-gray-600 dark:text-gray-400 mt-12">Carregando dados...</div>;

    switch (activeTab) {
      case "itbi-avaliacoes":
        return <ItbiAvaliacoes data={tributosData?.itbiAvaliacoes} year={year} />;
      case "itbi-pesquisa":
        return <ItbiPesquisa data={tributosData?.itbiPesquisa} />;
      case "iptu-contribuintes":
        return <IptuContribuintes data={tributosData?.iptuContribuintes} year={year} />;
      case "iptu-valores":
        return <IptuValores data={tributosData?.iptuValores} year={year} />;
      case "iptu-pesquisa":
        return <IptuPesquisa data={tributosData?.iptuPesquisa} />;
      default:
        return <ItbiContribuintes data={tributosData?.itbiContribuintes} year={year} />;
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide dark:text-gray-200">
        Tributos — ITBI e IPTU
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

export default TributosPage;
