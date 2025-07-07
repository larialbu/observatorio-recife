"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getAccTextGroup } from "@/functions/process_data/observatorio/micro-caged/getAccTextGroup";

const EmpresasGrupo = ({
  data,
  municipio,
  color,
  title = "Empresas por Natureza Jurídica Grupo",
  year,
}: any) => {
  const dataEmpresas = data
  // const dataEmpresas = data['empresas']

  const groups = [{ name: 'Indústria', includes: ['C', 'E', 'D', 'B'], quantity: 0 }, { name: 'Comércio', includes: ['G'], quantity: 0 }, { name: 'Agropecuária', includes: ['A'], quantity: 0 }, { name: 'Construção', includes: ['F'], quantity: 0 }, { name: 'Serviços', includes: ['N', 'P', 'H', 'K', 'Q', 'I', 'J', 'S', 'M', 'R', 'L', 'O', 'U'], quantity: 0 } ]
  
  const dataArr = getObjToArr<number>(dataEmpresas?.['secao'] || {}).sort((a, b) => b.value - a.value)

  const chartData = getAccTextGroup(dataArr, groups).sort((a, b) => b.value - a.value)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title + ` - (${municipio})`}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={[color]}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default EmpresasGrupo;
