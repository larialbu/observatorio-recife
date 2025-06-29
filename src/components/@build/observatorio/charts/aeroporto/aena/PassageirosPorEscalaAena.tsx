"use client";

import React, { useState } from "react";

import { AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { preparePassageirosPorEscalaData } from "@/functions/process_data/observatorio/aeroporto/aena/passageirosPorEscalaAena";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PassageirosPorEscalaAena = ({
  data = [],
  title = "Passageiros por conexão",
}: ChartBuild<AenaPassageirosHeaders[]>) => {
  const [showPercentage, setShowPercentage] = useState(true);
  
  const chartData = preparePassageirosPorEscalaData(data);

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
          nameKey="escala"
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPorEscalaAena;
