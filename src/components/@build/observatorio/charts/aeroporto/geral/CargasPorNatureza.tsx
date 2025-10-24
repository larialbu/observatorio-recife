"use client";

import React, { useState } from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";
import { AnacChartData } from "@/@types/observatorio/@fetch/aeroporto";


const CargasPorNatureza = ({
  data,
  title = "Cargas por Natureza do Voo",
}: ChartBuild<any>) => {

  const [showPercentage, setShowPercentage] = useState(true);

  const chartData = Object.entries((Object.entries(data?.anac?.['NATUREZA'] || []) || []).reduce((acc: any, [key, value]: any) => {
    if (!acc[key]) acc[key] = 0;
    // acc[key] += value['PASSAGEIRO'] || 0;
    acc[key] += value['CARGA'] || 0;
    // acc[key] += value['DECOLAGENS'] || 0;

    return acc;
  }, {}) || []).map(([key, value]: any) => ({ label: key, value }))

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

export default CargasPorNatureza;
