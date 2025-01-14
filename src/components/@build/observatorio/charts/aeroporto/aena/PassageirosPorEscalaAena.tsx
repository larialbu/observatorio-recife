"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { preparePassageirosPorEscalaData } from "@/functions/process_data/observatorio/aeroporto/aena/passageirosPorEscalaAena";

const PassageirosPorEscalaAena = ({
  data,
  title = "Passageiros por conexão",
  year,
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
  
  const chartData = preparePassageirosPorEscalaData(data);

  return (
    <div className="relative bg-white w-full p-4">
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
