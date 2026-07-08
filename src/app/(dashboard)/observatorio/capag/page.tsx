"use client";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { CapagDataResult } from "@/@types/observatorio/@data/capagData";
import { getYearSelected } from "@/utils/filters/@global/getYearSelected";

import CapagGeral from "./(geral)/capagGeral";

const CapagPage = () => {
  const { isLoading, data, filters, applyFilters } = useDashboard();

  const year = getYearSelected(filters);
  const capagData = data as CapagDataResult | null;

  const handleSelectMunicipio = (municipio: string, uf: string) => {
    applyFilters({
      ...filters,
      additionalFilters: (filters.additionalFilters ?? []).map((f) => {
        if (f.label === "MUNICÍPIO") return { ...f, selected: [`${municipio} - ${uf}`] };
        return f;
      }),
    });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6 min-h-screen mt-48">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide dark:text-gray-200">
        CAPAG — Capacidade de Pagamento
      </h1>

      {!capagData ? (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-12">Carregando dados...</div>
      ) : (
        <CapagGeral data={capagData?.geral} year={year} onSelectMunicipio={handleSelectMunicipio} />
      )}
    </div>
  );
};

export default CapagPage;
