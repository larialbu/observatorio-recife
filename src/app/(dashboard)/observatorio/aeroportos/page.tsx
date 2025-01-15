"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { applyGenericFilters } from "@/utils/filters/applyGenericFilters";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import AenaPage from "./(aena)/aena";

const AeroportosPage = () => {
  const searchParams = useSearchParams();
  const { filters, isLoading, data } = useDashboard();
  const [activeTab, setActiveTab] = useState("geral");
  const [filteredData, setFilteredData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  useEffect(() => {
    if (data?.length > 0) {
      const filtered = applyGenericFilters(data[0]?.data || [], filters);
      setFilteredData(filtered);
    }
  }, [filters, data]);

  if (isLoading) return <LoadingScreen />;

  const renderContent = () => {
    switch (activeTab) {
      case "geral":
        return <Geral data={filteredData} />;
      case "comparativo":
        return <Comparativo data={filteredData} />;
      case "embarque":
        return <Embarque data={filteredData} />;
      case "aena":
        return <AenaPage data={filteredData} />;
      default:
        return <Geral data={filteredData} />;
    }
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Movimentação de Aeroportos
      </h1>
      <div className="flex justify-center gap-6 mb-8">
        {["geral", "comparativo", "embarque", "aena"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleNavigation(tab)}
            className={`px-6 py-3 rounded-lg text-lg font-semibold ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
