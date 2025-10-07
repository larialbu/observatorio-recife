"use client";

import React from "react";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const IptuZona = ({
  data,
  title = "Contribuintes por Zona",
  year,
}: any) => {
  const dataItbi = data['tributos']
  
  const chartData = getObjToArr<number>(dataItbi['zona'] || {}).sort((a, b) => b.value - a.value).map(item => ({
    ...item,
    label: item.label === 'null' ? 'Não Informado' : item.label,
  }));
    
  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default IptuZona;
