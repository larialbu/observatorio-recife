"use client";

import React from "react";

import CapagNotaCard from "@/components/@build/observatorio/cards/capag/CapagNotaCard";
import EvolucaoIndicador from "@/components/@build/observatorio/charts/capag/EvolucaoIndicador";
import CapagClassificacaoTable from "@/components/@build/observatorio/tables/capag/CapagClassificacaoTable";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { CapagMunicipioData } from "@/@types/observatorio/@data/capagData";

const BrazilCapagMap = React.lazy(() => import("@/components/@build/observatorio/maps/capag/BrazilCapagMap"));

type CapagGeralProps = {
  data?: { recife: CapagMunicipioData | null; comparado: CapagMunicipioData | null };
  year?: string;
  onSelectMunicipio: (municipio: string, uf: string) => void;
};

const CapagGeral = ({ data, year = "--", onSelectMunicipio }: CapagGeralProps) => {
  const recife = data?.recife;
  const comparado = data?.comparado ?? null;

  return (
    <div className="pb-4 flex flex-col gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.6fr_1.2fr] gap-6">
        {/* Tabelas (esquerda) */}
        <div className="flex flex-col gap-6">
          <ErrorBoundary>
            <CapagClassificacaoTable data={recife ?? null} title="Classificação Capag Recife - PE" color={ColorPalette.default[0]} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CapagClassificacaoTable
              data={comparado}
              title={comparado ? `Classificação Capag ${comparado.municipio} - ${comparado.uf}` : "Município Comparado"}
              color={ColorPalette.default[1]}
            />
          </ErrorBoundary>
        </div>

        {/* Cards (centro) */}
        <div className="flex flex-col gap-6 justify-center">
          <ErrorBoundary>
            <CapagNotaCard title="Nota Geral - Recife" nota={recife?.notaGeral} year={year} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CapagNotaCard title={comparado ? `Nota Geral - ${comparado.municipio}` : "Nota Geral - Município"} nota={comparado?.notaGeral} year={year} />
          </ErrorBoundary>
        </div>

        {/* Mapa (direita) */}
        <div className="bg-white dark:bg-[#0C1B2B] rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <ErrorBoundary>
            <React.Suspense fallback={<div className="h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />}>
              <BrazilCapagMap municipioSelecionado={comparado?.municipio} onSelectMunicipio={onSelectMunicipio} />
            </React.Suspense>
          </ErrorBoundary>
        </div>
      </div>

      {/* Gráficos de linha (histórico 2021-2024) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#0C1B2B] rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <ErrorBoundary>
            <EvolucaoIndicador data={data} campo="endividamento" title="Endividamento (2021-2024)" />
          </ErrorBoundary>
        </div>
        <div className="bg-white dark:bg-[#0C1B2B] rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <ErrorBoundary>
            <EvolucaoIndicador data={data} campo="liquidez" title="Liquidez (2021-2024)" />
          </ErrorBoundary>
        </div>
        <div className="bg-white dark:bg-[#0C1B2B] rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <ErrorBoundary>
            <EvolucaoIndicador data={data} campo="poupancaCorrente" title="Poupança Corrente (2021-2024)" />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default CapagGeral;
