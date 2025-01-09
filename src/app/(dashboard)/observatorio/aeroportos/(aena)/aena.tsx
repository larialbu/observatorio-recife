"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";
import { processFilters } from "@/utils/filters/@global/processFilters";
import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { aeroportoDataFilter } from "@/utils/filters/@data/aeroportoDataFilter";
import { ProcessedAenaPassageirosData } from "@/@types/observatorio/aeroporto/processedAenaPassageirosData";
import { ProcessedAenaCargasData } from "@/@types/observatorio/aeroporto/processedAenaCargasData";
import charts from "./@imports/carga/charts";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";

const AenaPage = () => {
  const { filters, setFilters } = useDashboard();
  const [passageirosData, setPassageirosData] = useState<ProcessedAenaPassageirosData[]>([]);
  const [cargasData, setCargasData] = useState<ProcessedAenaCargasData[]>([]);
  const [filteredPassageirosData, setFilteredPassageirosData] = useState<ProcessedAenaPassageirosData[]>([]);
  const [filteredCargasData, setFilteredCargasData] = useState<ProcessedAenaCargasData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prevYear = useRef<string | null>(null);
  const fetchingRef = useRef(false);

  useEffect(() => {
    const currentYear = filters.year || "2024";

    if (fetchingRef.current) return;
    if (prevYear.current === currentYear && passageirosData.length > 0 && cargasData.length > 0) return;

    const fetchData = async () => {
      fetchingRef.current = true;
      setLoading(true);

      try {
        const aeroportoService = new AeroportoData(currentYear);
        const passageiros = await aeroportoService.fetchProcessedAenaPassageirosData();
        const cargas = await aeroportoService.fetchProcessedAenaCargasData();
        setPassageirosData(passageiros);
        setCargasData(cargas);

        if (prevYear.current === null) {
          const dynamicFilters = processFilters(passageiros, aenaFilters);
          setFilters((prevFilters: any) => ({
            ...prevFilters,
            additionalFilters: dynamicFilters.additionalFilters,
          }));
        }

        prevYear.current = currentYear;
      } catch (err) {
        console.error("Erro ao buscar dados da AENA:", err);
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    };

    fetchData();
  }, [filters.year, setFilters, passageirosData.length, cargasData.length]);



  useEffect(() => {
    if (passageirosData.length > 0) {
      const filteredPassageiros = aeroportoDataFilter(passageirosData, filters);
      setFilteredPassageirosData(filteredPassageiros);
    }

    if (cargasData.length > 0) {
      const filteredCargas = aeroportoDataFilter(cargasData, filters);
      setFilteredCargasData(filteredCargas);
    }
  }, [passageirosData, cargasData, filters]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // filteredPassageirosData
  // filteredCargasData

console.log('Cargas -><-', filteredCargasData)
console.log('Passageiros -><-', filteredPassageirosData)

  return (
    <div>
    {/* <div className="flex flex-wrap gap-4 justify-center mb-8">
      {cards.map(({ Component }, index) => (
        <React.Suspense fallback={<div>Loading...</div>} key={index}>
          <Component
            data={data}
            year={year}
            color={ColorPalette.default[index]}
          />
        </React.Suspense>
      ))}
    </div> */}

    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
    {charts.map(({ Component }, index) => (
  <div
    key={index}
    className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
  >
    <React.Suspense fallback={<div>Loading...</div>}>
      {/* Passando os dados filtrados ao invés dos não filtrados */}
      <Component passageirosData={filteredPassageirosData} cargasData={filteredCargasData} />
    </React.Suspense>
  </div>
))}

    </div>
  </div>
  );
};

export default AenaPage;
