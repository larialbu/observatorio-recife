"use client";

import React, { useRef, useState } from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { resizeDiv } from "@/components/@global/features/resizeDiv";

const SaldoInstrucao = ({
  data,
  title = "Saldo por Grau de Instrução",
  year,
}: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  resizeDiv(containerRef, width, setWidth)

  const chartData = getObjToArr<number>(data['graudeinstrução'] || {}).sort((a, b) => b.value - a.value)

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

export default SaldoInstrucao;
