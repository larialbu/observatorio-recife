"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { comparativeDomesticoInternacional } from "@/functions/process_data/observatorio/aeroporto/embarque/comparativeDomesticoInternacional";

const CargasComparativo = ({
  data,
  title = "Cargas por Natureza do Voo",
  toCompare = ["Recife"],
  monthRecent,
  type
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = comparativeDomesticoInternacional(data, 'cargas', toCompare, type, monthRecent)

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

export default CargasComparativo;
