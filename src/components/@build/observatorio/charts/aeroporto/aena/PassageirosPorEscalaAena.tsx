"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { preparePassageirosPorEscalaData } from "@/functions/process_data/observatorio/aeroporto/aena/passageirosPorEscalaAena";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AenaPassageirosData } from "@/@types/observatorio/@data/aeroportoData";

const PassageirosPorEscalaAena = ({
  data,
  title = "Passageiros por conexão",
}: ChartBuild<AenaPassageirosData>) => {
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
