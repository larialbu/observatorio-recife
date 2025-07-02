"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";

const EmpresasBairroAtivasInativas = ({
  data,
  colors = ColorPalette.default,
  title = "Empresas por Bairro",
  year,
}: any) => {
  
  // const chartData = getObjToArr<number>(data['nome_bairro'] || {}).sort((a, b) => b.value - a.value)
  console.log('ChartData', data)  

  return (
    <div className="chart-wrapper">
      <p>grafico</p>
      {/* <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber> */}
      {/* <ChartGrabber>
        <StackedBarChart
        data={chartData}
        title={title}
        colors={colors.slice(1)}
        xKey="continente"
        bars={[
          { 
            dataKey: "importacao", 
            name: "Importação",
            showPercentage: true,
            percentageField: "percentualImportacao",
          },
          { 
            dataKey: "exportacao", 
            name: "Exportação",
            showPercentage: true,
            percentageField: "percentualExportacao",
          },
        ]}
        tooltipEntry=" dólares"
        heightPerCategory={80} // Define a altura de cada barra
        visibleHeight={400} // Define a altura visível para scroll
      />
      </ChartGrabber> */}
    </div>
  );
};

export default EmpresasBairroAtivasInativas;
