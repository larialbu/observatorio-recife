"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";

// function somarPortosTodosAnos(data: any[]) {
//   const resultado = {};

//   data.forEach((entry: any) => {
//       const { portos } = entry;

//       for (const porto in portos) {
//           if (!resultado[porto] ) {
//               resultado[porto] = 0;
//           }
//           resultado[porto] += portos[porto]; // Soma as cargas dos anos diferentes
//       }
//   });

//   return Object.entries(resultado).map(([porto, carga]) => ({
//       porto,
//       carga
//   }));
// }

const OperacaoPortos = ({
  data, 
  months,
  title = "Produtos Comercializados (Ton)",
  year,
}: any) => {

  // console.log('DATA GERAL', data, months)

  console.log('DATA portos operacao sem FILTRO', data.charts.portos )
  // console.log('DATA portos operacao', data.charts.portos.filter((item: any) => item.mes !== 'Total'))

  // console.log('DATA DO BGLH', somarPortosTodosAnos(data.charts.portos.filter((item: any) => item.mes !== 'Total')))

  const chartData = data.charts.portos.sort((a: any, b: any) => b.VLPesoCargaBruta - a.VLPesoCargaBruta)

  // console.log('CHARTDATA', chartData)

  return (
    <div className="chart-wrapper">
      {/* <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="Porto Atracação"
          bars={[{ dataKey: "VLPesoCargaBruta", name: "Produto" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber> */}
    </div>
  );
};

export default OperacaoPortos;
