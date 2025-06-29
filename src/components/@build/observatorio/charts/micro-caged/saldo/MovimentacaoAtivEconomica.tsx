"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { resizeDiv } from "@/components/@global/features/resizeDiv";
import { microCagedAtivEconomicaDicts } from "@/utils/dicts/micro-caged/microCagedAtivEconomicaDicts";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MovimentacaoAtivEconomica = ({
  data,
  title = "Saldo por Atividade Econômica",
  year,
}: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  resizeDiv(containerRef, width, setWidth)

  const chartData = getObjToArr<number>(data['seção'] || {}).map((obj) => ({ ...obj, label: microCagedAtivEconomicaDicts[obj.label] })).sort((a, b) => b.value - a.value)

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

export default MovimentacaoAtivEconomica;
