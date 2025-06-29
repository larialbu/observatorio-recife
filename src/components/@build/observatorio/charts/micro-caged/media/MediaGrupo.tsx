"use client";

import React from "react";

import TreeMapChart from "@/components/@global/charts/TreeMapChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getAttGroups } from "@/functions/process_data/observatorio/micro-caged/getAttGroups";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MediaGrupo = ({
  data = [],
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "Salário Médio por Agrupamento Econômico",
}: any) => {

  const quantity = data?.['quantity'] || {}
  const values = data?.['values'] || {}

  const groups = [{ name: 'Indústria', includes: ['C', 'E', 'D', 'B'], quantity: 0, value: 0 }, { name: 'Comércio', includes: ['G'], quantity: 0, value: 0 }, { name: 'Agropecuária', includes: ['A'], quantity: 0, value: 0 }, { name: 'Construção', includes: ['F'], quantity: 0, value: 0 }, { name: 'Serviços', includes: ['N', 'P', 'H', 'K', 'Q', 'I', 'J', 'S', 'M', 'R', 'L', 'O', 'U'], quantity: 0, value: 0 } ]

  const qauntityAtt = getAttGroups('quantity', quantity['seção'], groups)
  const valueAtt = getAttGroups('value', values['seção'], qauntityAtt)
  
  const chartData = valueAtt.map((group: any) => ({ label: group.name, value: group.value / group.quantity }))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <TreeMapChart data={chartData} title={title} colors={colors} xKey={'label'} dataKey={'value'}/>
      </ChartGrabber>
    </div>
  );
};

export default MediaGrupo;
