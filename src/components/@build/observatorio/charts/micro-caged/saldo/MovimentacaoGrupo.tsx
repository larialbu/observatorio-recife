"use client";

import React from "react";

import TreeMapChart from "@/components/@global/charts/TreeMapChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getAccTextGroup } from "@/functions/process_data/observatorio/micro-caged/getAccTextGroup";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MovimentacaoGrupo = ({
  data = [],
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "Saldo por Agrupamento Econômico",
}: any) => {

  const groups = [{ name: 'Indústria', includes: ['C', 'E', 'D', 'B'], quantity: 0 }, { name: 'Comércio', includes: ['G'], quantity: 0 }, { name: 'Agropecuária', includes: ['A'], quantity: 0 }, { name: 'Construção', includes: ['F'], quantity: 0 }, { name: 'Serviços', includes: ['N', 'P', 'H', 'K', 'Q', 'I', 'J', 'S', 'M', 'R', 'L', 'O', 'U'], quantity: 0 } ]

  const dataArr = getObjToArr<number>(data['seção'] || {})

  const chartData = getAccTextGroup(dataArr, groups)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <TreeMapChart data={chartData} title={title} colors={colors} xKey={'label'} dataKey={'value'}/>
      </ChartGrabber>
    </div>
  );
};

export default MovimentacaoGrupo;
