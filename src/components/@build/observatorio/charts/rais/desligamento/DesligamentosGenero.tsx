"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const DesligamentosGenero = ({
  data,
  title = "Distribuição formal de desligamentos por Gênero",
  year,
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = getObjToArr<number>(data['Sexo Trabalhador'] || {})

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

export default DesligamentosGenero;
