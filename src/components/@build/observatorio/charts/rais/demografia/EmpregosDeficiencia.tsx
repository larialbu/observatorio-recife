"use client";

import React, { useState } from "react";

import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpregosDeficiencia = ({
  data,
  title = "Distribuição formal de empregos por necessidade especial",
  year,
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);

  const { "NAO DEFIC": _, ...defics } = data['Tipo Defic'] || {}

  const chartData = getObjToArr<number>(defics || {})

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

export default EmpregosDeficiencia;
