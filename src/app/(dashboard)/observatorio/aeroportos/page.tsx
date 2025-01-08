"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";
import { aeroportoDataFilter } from "@/utils/filters/@data/aeroportoDataFilter";
import { aeroportosFilters } from "@/utils/filters/aeroporto/anacFilters";
import { processFilters } from "@/utils/filters/@global/processFilters";

import Geral from "./(geral)/geral";
import Comparativo from "./(comparativo)/comparativo";
import Embarque from "./(embarque)/embarque";
import { getMonthRecent } from "@/utils/filters/@global/getMonthRecent";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

const AeroportosPage = () => {
  const { filters, setFilters } = useDashboard();
  const router = useRouter();
  const pathname = usePathname(); // Obtém a rota atual
  const [data, setData] = useState([]) as any;
  const [filteredData, setFilteredData] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("geral");

  const prevYear = useRef<string | null>(null);
  const fetchingRef = useRef(false);

  useEffect(() => {
    const currentYear = filters.year || "2024";

    if (fetchingRef.current) return;
    if (prevYear.current === currentYear && data.length > 0) return;

    const fetchData = async () => {
      fetchingRef.current = true;
      setLoading(true);

      try {
        const aeroportoService = new AeroportoData(currentYear);
        const fetchedData = await aeroportoService.fetchProcessedData();
        setData(fetchedData);

        if (prevYear.current === null) {
          const dynamicFilters = processFilters(fetchedData, aeroportosFilters);
          setFilters((prevFilters: any) => ({
            ...prevFilters,
            additionalFilters: dynamicFilters.additionalFilters,
          }));
        }

        prevYear.current = currentYear;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Erro ao buscar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    };

    fetchData();
  }, [filters.year, setFilters, data.length]);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = aeroportoDataFilter(data, filters);
      setFilteredData(filtered);
    }
  }, [data, filters]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

console.log('-><-.<',filters)

  const renderContent = () => {
    switch (activeTab) {
      case "geral":
        return (
          <Geral
            data={filteredData}
            year={
              getYearSelected(filters)
            }
          />
        );
      case "comparativo":
        return (
          <Comparativo
            toCompare={filters.additionalFilters[4]?.options}
            data={filteredData}
            year={
              getYearSelected(filters)
            }
          />
        );
      case "embarque":
        return (
          <Embarque
            toCompare={
              filters.additionalFilters[4]?.selected
            }
            monthRecent={
              getMonthRecent(filters, 1)

            }
            data={filteredData}
          />
        );
      case "aena":
        return <Geral data={filteredData} year={filters.year || "2024"} />;
      default:
        return (
          <Geral
            data={filteredData}
            year={
              getYearSelected(filters)
            }
          />
        );
    }
  };

  const handleNavigation = (tab: string, appendPath?: string) => {
    setActiveTab(tab);
    if (appendPath) {
      const newPath = pathname.endsWith(appendPath)
        ? pathname // Evita duplicar `/aena` se já estiver na URL
        : `${pathname}${appendPath}`;
      router.push(newPath); // Atualiza a rota atual com `/aena`
    }
  };

  return (
    <div className="p-6 min-h-screen ">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
        Movimentação de Aeroportos
      </h1>

      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        <button
          onClick={() => handleNavigation("geral")}
          className={`px-6 py-3 rounded-lg ${
            activeTab === "geral" ? "bg-orange-600 text-white" : "bg-gray-300"
          }`}
        >
          Resumo Geral
        </button>
        <button
          onClick={() => handleNavigation("comparativo")}
          className={`px-6 py-3 rounded-lg ${
            activeTab === "comparativo"
              ? "bg-blue-600 text-white"
              : "bg-gray-300"
          }`}
        >
          Comparativo
        </button>
        <button
          onClick={() => handleNavigation("embarque")}
          className={`px-6 py-3 rounded-lg ${
            activeTab === "embarque"
              ? "bg-green-600 text-white"
              : "bg-gray-300"
          }`}
        >
          Embarque/Desembarque
        </button>
        <button
          onClick={() => handleNavigation("aena", "/aena")}
          className={`px-6 py-3 rounded-lg ${
            activeTab === "aena" ? "bg-purple-600 text-white" : "bg-gray-300"
          }`}
        >
          Aena
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default AeroportosPage;
