"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getAccSalario } from "@/functions/process_data/observatorio/micro-caged/getAccSalario";
import { getAttGroups } from "@/functions/process_data/observatorio/micro-caged/getAttGroups";
import { geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MediaGrupo = ({
  data,
  title = "Informações por CBO",
  year,
}: any) => {
  const dataObj = geralAccFunction(data || [], ["seção"])

  const keysObj = Object.keys(data?.[0] || []).filter(key =>  key === 'seção' )

  const dataSalario = getAccSalario(data, keysObj)

  const dataValues = { quantity: dataObj, values: dataSalario}

  const quantity = dataValues?.['quantity'] || {}
  const values = dataValues?.['values'] || {}

  const groups = [{ name: 'Indústria', includes: ['C', 'E', 'D', 'B'], quantity: 0, value: 0 }, { name: 'Comércio', includes: ['G'], quantity: 0, value: 0 }, { name: 'Agropecuária', includes: ['A'], quantity: 0, value: 0 }, { name: 'Construção', includes: ['F'], quantity: 0, value: 0 }, { name: 'Serviços', includes: ['N', 'P', 'H', 'K', 'Q', 'I', 'J', 'S', 'M', 'R', 'L', 'O', 'U'], quantity: 0, value: 0 } ]

  const qauntityAtt = getAttGroups('quantity', quantity['seção'], groups)
  const valueAtt = getAttGroups('value', values['seção'], qauntityAtt)
  
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
