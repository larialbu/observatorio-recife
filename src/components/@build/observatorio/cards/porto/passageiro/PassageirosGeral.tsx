import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { processPassageirosTotalizados } from "@/functions/process_data/observatorio/porto/passageiro/cards/passageirosTotalizados";
import { getUniqueValues, getUniqueValuesArr } from "@/utils/filters/@global/getUniqueValues";
import React, { ElementType } from "react";

const PassageirosGeral = ({
  data,
  cards,
  ColorPalette,
  date,
  title = `Exportação de cargas`,
  local,
  year,
  color,
}: any) => {

console.log('DADTA', data)

  console.log('TROÇOV', data.passageiros.current,
    data.passageiros.past)

  const current = processPassageirosTotalizados(data.passageiros.current || [])
  const past = processPassageirosTotalizados(data.passageiros.past || [])
 
  console.log('PASSAGIEROS TOTALIZADOSSa', current)
  console.log('PASSAGIEROS TOTALIZADOSS', past)
    

//   item.past > 0 ? ((item.current - item.past) / item.past) * 100 : 0
//   const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, true)
  const chartData = {
    current: current,
    past: past,
    variant: past > 0 ? ((current - past) / past) * 100 : 0,
  }

  console.log('ChasrtData cards', chartData)

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-2">
    {cards.map(({ Component }: { Component: ElementType }, index: number) => (
      <React.Suspense fallback={<div>Loading...</div>} key={index}>
        <Component data={chartData} year={year} color={ColorPalette[index]} />
      </React.Suspense>
    ))}
  </div>
  );
};

export default PassageirosGeral;
