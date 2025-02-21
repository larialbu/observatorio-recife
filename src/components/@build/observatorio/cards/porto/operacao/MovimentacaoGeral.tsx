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


// console.log('DATA GGERAL', data)


// console.log('UNIQUE VALEUS ação', getUniqueValues<any, "Ação">(
//     data.carga,
//     "Ação"
//   ),)


// console.log('UNIQUE VALEUS Tipo Navegação', getUniqueValues<any, "Tipo Navegação">(
//     data.carga,
//     "Tipo Navegação"
//   ),)

      
// console.log('UNIQUE VALEUS Tipo Operação da Carga', getUniqueValues<any, "Tipo Operação da Carga">(
//     data.carga,
//     "Tipo Operação da Carga"
//   ),)

//   console.log('UNIQUE VALEUS Tipo Operação da Carga ARRAY ', getUniqueValuesArr<any, "Tipo Operação da Carga">(
//     data.carga,
//     "Tipo Operação da Carga"
//   ),)

  const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, true)

  console.log('CHARTDADATA', chartData)

  return (
    <>
    {cards.map(({ Component }: {Component: ElementType}, index: number) => (
      <React.Suspense fallback={<div>Loading...</div>} key={index}>
        <Component data={chartData} year={year} color={ColorPalette[index]} />
      </React.Suspense>
    ))}
  </>
  );
};

export default MovimentacaoGeral;
