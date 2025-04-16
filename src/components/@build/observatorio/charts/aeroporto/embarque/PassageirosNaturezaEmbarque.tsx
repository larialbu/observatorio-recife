"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { processEmbarqueDomesticoInternacional } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDomesticoInternacional";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const PassageirosComparativo = ({
  data,
  title = "Passageiros por Natureza do Voo",
  toCompare = ["Recife"],
  monthRecent,
  type
}: ChartBuild<AnacGeralHeaders[]>) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = processEmbarqueDomesticoInternacional(data, 'passageiros', toCompare, type, monthRecent)

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
          dataKey="total"
          nameKey="natureza"
          colors={[ColorPalette.default[2], ColorPalette.default[1]]}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosComparativo;
