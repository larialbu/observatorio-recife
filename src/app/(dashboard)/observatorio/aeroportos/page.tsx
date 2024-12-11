"use client";

import React, { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";

const AeroportosPage = () => {
  const { year } = useDashboard();
  const [data, setData] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Array de gráficos
  const charts = [
    {
      Component: React.lazy(
        () => import("@/components/@build/observatorio/charts/aeroporto/geral/EmbarqueDesembarqueRegiao")
      ),
      title: "Embarque e Desembarque por Região",
    },
    {
      Component: React.lazy(
        () => import("@/components/@build/observatorio/charts/aeroporto/geral/PassageirosAno")
      )
    },
    {
      Component: React.lazy(
        () => import("@/components/@build/observatorio/charts/aeroporto/geral/CargaAno")
      )
    },
    {
      Component: React.lazy(
        () => import("@/components/@build/observatorio/charts/aeroporto/geral/CargaPorNatureza")
      )
    },
    {
      Component: React.lazy(
        () => import("@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorAeroporto")
      )
    },
    {
      Component: React.lazy(
        () => import("@/components/@build/observatorio/charts/aeroporto/geral/CargaPorAeroporto")
      )
    },
    {
      Component: React.lazy(
        () => import("@/components/@build/observatorio/charts/aeroporto/geral/DecolagemPorAeroporto")
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const aeroportoService = new AeroportoData(year);

      try {
        const fetchedData = await aeroportoService.fetchProcessedData();
        setData(fetchedData);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);

        setError("Erro ao buscar os dados. Tente novamente mais tarde.");
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Movimentação de Aeroportos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map(({ Component, title }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<LoadingScreen />}>
              {/* <h3 className="text-lg font-semibold mb-4">{title}</h3> */}
              <Component data={data} year={year} />
            </React.Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AeroportosPage;
