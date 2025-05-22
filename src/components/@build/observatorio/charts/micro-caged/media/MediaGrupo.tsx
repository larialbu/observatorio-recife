"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import TreeMapChart from "@/components/@global/charts/TreeMapChart";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { getAccTextGroup } from "@/functions/process_data/observatorio/micro-caged/getAccTextGroup";
import { getAvarageGroups } from "@/functions/process_data/observatorio/micro-caged/getAvarageGroups";

const attGroups = (keyName: 'quantity' | 'value', data: any[], groups: any[]) => {
  const groupsCopy = JSON.parse(JSON.stringify(groups))
  
  for (const key in data) {
    const groupFind = groupsCopy.find((group: any) => group.includes.includes(key)) || null
    if (typeof groupFind?.[keyName] === 'number') groupFind[keyName] += data[key]
  }

  return groupsCopy
}

const MediaGrupo = ({
  data = [],
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "MediaGrupo",
//   title = "Distribuição desligamentos de empregos por Setor",
}: any) => {

  const quantity = data?.['quantity'] || {}
  const values = data?.['values'] || {}

  const groups = [{ name: 'Indústria', includes: ['C', 'E', 'D', 'B'], quantity: 0, value: 0 }, { name: 'Comércio', includes: ['G'], quantity: 0, value: 0 }, { name: 'Agropecuária', includes: ['A'], quantity: 0, value: 0 }, { name: 'Construção', includes: ['F'], quantity: 0, value: 0 }, { name: 'Serviços', includes: ['N', 'P', 'H', 'K', 'Q', 'I', 'J', 'S', 'M', 'R', 'L', 'O', 'U'], quantity: 0, value: 0 } ]

  const qauntityAtt = attGroups('quantity', quantity['seção'], groups)
  const valueAtt = attGroups('value', values['seção'], qauntityAtt)
  
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
