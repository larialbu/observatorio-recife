import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { getUniqueValues, getUniqueValuesArr } from "@/utils/filters/@global/getUniqueValues";
import React, { ElementType } from "react";

const EmpregosGeral = ({
  data,
  cards,
  ColorPalette,
  date,
  title = `Exportação de cargas`,
  local,
  year,
  color,
}: any) => {
    let total = 0 
    let valMax = 0
    // Vl Remun Dezembro Nom
    console.log('DADOS INICIAIS', data)

    console.log('graf1', data.ativ.length)

    data.ativ.map((item: any) => {
        const val = item['Vl Remun Dezembro Nom']
        if (val > valMax) {
            valMax = val
        }
        total += val
    })
    
    console.log('GRAFS 2 3', total / data.ativ.length, valMax)
//   const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, true)

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-2">
    {cards.map(({ Component }: {Component: ElementType}, index: number) => (
      <React.Suspense fallback={<div>Carregando...</div>} key={index}>
       <Component local={local} data={{}} year={year} color={ColorPalette[index]} />
      </React.Suspense>
    ))}
  </div>
  );
};

export default EmpregosGeral;
