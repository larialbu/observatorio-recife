import { PortoPassageirosOutputData } from "@/@types/observatorio/@data/portoData";
import { CardBuild } from "@/@types/observatorio/shared";
import { processPassageirosTotalizados } from "@/functions/process_data/observatorio/porto/passageiro/cards/passageirosTotalizados";
import React, { ElementType } from "react";

const PassageirosGeral = ({
  data,
  cards,
  color,
}: CardBuild<PortoPassageirosOutputData>) => {

  const current = processPassageirosTotalizados(data.passageiros.current || [])
  const past = processPassageirosTotalizados(data.passageiros.past || [])
 
//   item.past > 0 ? ((item.current - item.past) / item.past) * 100 : 0
//   const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, true)
  const chartData = {
    current: current,
    past: past,
    variant: (past > 0 ? ((current - past) / past) * 100 : 0).toFixed(2) || 0,
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-2">
    {cards?.map(({ Component }: { Component: ElementType }, index: number) => (
      <React.Suspense fallback={<div>Carregando...</div>} key={index}>
        <Component data={chartData} color={color[index]} />
      </React.Suspense>
    ))}
  </div>
  );
};

export default PassageirosGeral;
