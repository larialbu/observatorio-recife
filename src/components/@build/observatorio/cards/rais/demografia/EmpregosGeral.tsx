import React, { ElementType } from "react";

import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { getUniqueValues, getUniqueValuesArr } from "@/utils/filters/@global/getUniqueValues";

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

    data.ativ.map((item: any) => {
        const val = item['Vl Remun Dezembro Nom']
        if (val > valMax) {
            valMax = val
        }
        total += val
    })
    
    const chartData = {
      totalEmpregos: data.ativ.length,
      remuneracaoMed: total / data.ativ.filter((item: any) => item['Vl Remun Dezembro Nom'] != '0').length, 
      remuneracaoMax: valMax
    }

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-2">
    {cards.map(({ Component }: {Component: ElementType}, index: number) => (
      <React.Suspense fallback={<div>Carregando...</div>} key={index}>
       <Component local={local} data={chartData} year={year} color={ColorPalette[index]} />
      </React.Suspense>
    ))}
  </div>
  );
};

export default EmpregosGeral;
