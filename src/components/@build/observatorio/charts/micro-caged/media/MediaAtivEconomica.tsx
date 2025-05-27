"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { microCagedAtivEconomicaDicts } from "@/utils/dicts/micro-caged/microCagedAtivEconomicaDicts";
import { resizeDiv } from "@/components/@global/features/resizeDiv";
import { getAvarageGroups } from "@/functions/process_data/observatorio/micro-caged/getAvarageGroups";

const MediaAtivEconomica = ({
  data,
  title = "MediaAtivEconomica",
//   title = "Distribuição formal de empregos por faixa etária",
  year,
}: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  resizeDiv(containerRef, width, setWidth)

  const quantity = data?.['quantity'] || {}
  const values = data?.['values'] || {}

  const avarageData = getAvarageGroups(values, quantity)['seção'] || {}


  console.log('AVerage', avarageData)
  const chartData = getObjToArr<number>(avarageData || {}).map((obj) => ({ ...obj, label: microCagedAtivEconomicaDicts[obj.label] })).sort((a, b) => b.value - a.value)
  console.log('ChartData', chartData)

  return (
    <div ref={containerRef} className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={width && width > 315 ? -15 : -40 }
          maxDescriptionLength={25}
          yFontSize={width && width > 315 ? 12 : 10}
        />
      </ChartGrabber>
    </div>
  );
};

export default MediaAtivEconomica;
