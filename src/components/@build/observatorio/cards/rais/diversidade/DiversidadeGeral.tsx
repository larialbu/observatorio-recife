import React, { ElementType } from "react";

import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { getUniqueValues, getUniqueValuesArr } from "@/utils/filters/@global/getUniqueValues";

const DiversidadeGeral = ({
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

    const dataFiltred = data.ativ.filter((item: any) => item['Tipo Defic'] !== 'NAO DEFIC')

    dataFiltred.map((item: any) => {
        const val = item['Vl Remun Dezembro Nom']
        if (val > valMax) {
            valMax = val
        }
        total += val
    })
    
    const chartData = {
      totalEmpregos: dataFiltred.length,
      remuneracaoMed: total / dataFiltred.filter((item: any) => item['Vl Remun Dezembro Nom'] != '0').length, 
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

export default DiversidadeGeral;
