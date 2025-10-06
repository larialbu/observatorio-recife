"use client";

import React, { useState } from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";
import { AnacChartData } from "@/@types/observatorio/@fetch/aeroporto";


const PassageirosPorNatureza = ({
  data,
  title = "Passageiros por Natureza do Voo",
}: ChartBuild<AnacChartData>) => {

  const [showPercentage, setShowPercentage] = useState(true);

  const chartData = processRawAccumulator(data.rawData["AEROPORTO NOME"], 'NATUREZA', 'PASSAGEIRO');

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <PieChart
          data={chartData}
          title={title}
          underTitle={
            <ShowPercentages
              showPercentage={showPercentage}
              setShowPercentage={setShowPercentage}
            />
          }
          dataKey="value"
          nameKey="label"
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPorNatureza;
