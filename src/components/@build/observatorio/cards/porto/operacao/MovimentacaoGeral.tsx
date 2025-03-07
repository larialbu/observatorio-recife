import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { getUniqueValues, getUniqueValuesArr } from "@/utils/filters/@global/getUniqueValues";
import React, { ElementType } from "react";

const MovimentacaoGeral = ({
  data,
  cards,
  ColorPalette,
  date,
  title = `Exportação de cargas`,
  local,
  year,
  color,
}: any) => {


  const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, true)

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-2">
    {cards.map(({ Component }: {Component: ElementType}, index: number) => (
      <React.Suspense fallback={<div>Carregando...</div>} key={index}>
        <Component data={chartData} year={year} color={ColorPalette[index]} />
      </React.Suspense>
    ))}
  </div>
  );
};

export default MovimentacaoGeral;
