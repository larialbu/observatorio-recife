"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { processPassageirosPorNatureza } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosPorNatureza";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const PassageirosPorNatureza = ({
  rawData = [],
  title = "Cargas por Natureza do Voo",
  
}: ChartBuild<AnacGeralHeaders[]>) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = processPassageirosPorNatureza(rawData);


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
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPorNatureza;
