"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";
import { aeroportoDataFilter } from "@/utils/filters/@data/aeroportoDataFilter";
import { ProcessedAenaPassageirosData } from "@/@types/observatorio/aeroporto/processedAenaPassageirosData";
import { ProcessedAenaCargasData } from "@/@types/observatorio/aeroporto/processedAenaCargasData";
import charts from "./@imports/carga/charts";

const AenaPage = () => {
  const { filters, processAndSetFilters } = useDashboard(); // Usando a nova função do contexto
  const [passageirosData, setPassageirosData] = useState<ProcessedAenaPassageirosData[]>([]);
  const [cargasData, setCargasData] = useState<ProcessedAenaCargasData[]>([]);
  const [filteredPassageirosData, setFilteredPassageirosData] = useState<ProcessedAenaPassageirosData[]>([]);
  const [filteredCargasData, setFilteredCargasData] = useState<ProcessedAenaCargasData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prevYear = useRef<string | null>(null);
  const fetchingRef = useRef(false);

  useEffect(() => {
    console.log('ploc')
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
          processAndSetFilters(passageiros, filters); // Usando a função do contexto para processar os filtros
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
  }, [filters.year, processAndSetFilters, passageirosData.length, cargasData.length]);

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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map(({ Component }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              {/* Passando os dados filtrados */}
              <Component passageirosData={filteredPassageirosData} cargasData={filteredCargasData} />
            </React.Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AenaPage;
