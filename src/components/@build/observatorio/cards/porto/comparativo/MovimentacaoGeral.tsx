import React, { ElementType } from "react";

import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders } from "@/@types/observatorio/@fetch/porto";
import { CardBuild } from "@/@types/observatorio/shared";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";


const MovimentacaoGeral = ({
  data,
  cards,
  local,
  year,
  color,
}: CardBuild<PortoGeralData>) => {


  const chartData = prepareCargasPorAcaoData(data.atracacao as PortoAtracacaoHeaders[], data.carga, true)

  color = ColorPalette.default;

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-2">
    {cards?.map(({ Component }: {Component: ElementType}, index: number) => (
      <React.Suspense fallback={<div>Carregando...</div>} key={index}>
        <Component local={local} data={chartData} year={year} color={color[index]} />
      </React.Suspense>
    ))}
  </div>
  );
};

export default MovimentacaoGeral;
