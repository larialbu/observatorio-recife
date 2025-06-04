"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";
import { processMunicipiosMonthValues } from "@/functions/process_data/observatorio/micro-caged/comparativo-med/municipiosMonthValues";

const ComparativoVariacao = ({
  data = [],
  colors = ColorPalette.default,
  title = "Variação de Salário Médio (ano)",
  toCompare,
}: any) => {
  const dataCurrent = data['current']
  const dataPast = data['past']

  const monthCurrentData = processMunicipiosMonthValues(dataCurrent, toCompare)
  const monthPastData = processMunicipiosMonthValues(dataPast, toCompare) || []

  const monthVariation = monthCurrentData.map((month) => {
    const monthPast = monthPastData.find((obj) => obj['mes'] === month['mes']) || {}

    const dataVariation: { mes: string  } & { [key: string]: number | string } = { mes: ''}

    for (const key in month) {
      if (key === 'mes') dataVariation[key] = month[key] || 'inválido'

      if (!dataVariation[key]) {
        dataVariation[key] = monthPast?.[key] ? Math.round(((month[key] - monthPast[key]) / monthPast[key]) * 100 * 100) / 100 : 0
      };
    }

    return dataVariation
  })

  console.log('Variation ->', monthVariation)

  const chartData = monthVariation.map((data) => ({ ...data, order: monthToNumber(data['mes']) })).sort((a, b) => a.order - b.order)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[...getDateKeys(toCompare ?? [])]}
        />
      </ChartGrabber>
    </div>
  );
};

export default ComparativoVariacao;
