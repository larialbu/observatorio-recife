"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { getAvarageGroups } from "@/functions/process_data/observatorio/micro-caged/getAvarageGroups";
import { geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";
import { getAccSalario } from "@/functions/process_data/observatorio/micro-caged/getAccSalario";

const attGroups = (keyName: 'quantity' | 'value', data: any[], groups: any[]) => {
  const groupsCopy = JSON.parse(JSON.stringify(groups))
  
  for (const key in data) {
    const groupFind = groupsCopy.find((group: any) => group.includes.includes(key)) || null
    if (typeof groupFind?.[keyName] === 'number') groupFind[keyName] += data[key]
  }

  return groupsCopy
}

const MediaGrupo = ({
  data,
  title = "MediaGrupo",
//   title = "Distribuição formal de empregos por faixa etária",
  year,
}: any) => {
  const dataFiltred = data.filter((obj: any) => obj['indtrabintermitente'] == 0 && obj['salário'] > 1518 * 0.3 && obj['salário'] < 1518 * 150)

  const dataObj = geralAccFunction(data || [], ["seção"])

  const keysObj = Object.keys(data?.[0] || []).filter(key =>  key === 'seção' )

  const dataSalario = getAccSalario(dataFiltred, keysObj)

  const dataValues = { quantity: dataObj, values: dataSalario}

  const quantity = dataValues?.['quantity'] || {}
  const values = dataValues?.['values'] || {}

  const groups = [{ name: 'Indústria', includes: ['C', 'E', 'D', 'B'], quantity: 0, value: 0 }, { name: 'Comércio', includes: ['G'], quantity: 0, value: 0 }, { name: 'Agropecuária', includes: ['A'], quantity: 0, value: 0 }, { name: 'Construção', includes: ['F'], quantity: 0, value: 0 }, { name: 'Serviços', includes: ['N', 'P', 'H', 'K', 'Q', 'I', 'J', 'S', 'M', 'R', 'L', 'O', 'U'], quantity: 0, value: 0 } ]

  const qauntityAtt = attGroups('quantity', quantity['seção'], groups)
  const valueAtt = attGroups('value', values['seção'], qauntityAtt)
  
  const chartData = valueAtt.map((group: any) => ({ label: group.name, value: group.value / group.quantity }))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Salário Médio" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default MediaGrupo;
