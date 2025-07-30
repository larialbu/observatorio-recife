"use client";

import React, { useState } from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import PieChart from "@/components/@global/charts/PieChart";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";

const ItbiOcupacao = ({
  data,
  title = "Transmissões por Ocupação",
  year,
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const dataItbi = data['tributos']
  
  const chartData = getObjToArr<number>(dataItbi['tipo_ocupacao'] || {}).sort((a, b) => b.value - a.value)
    
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
    // <div className="chart-wrapper">
    //   <ChartGrabber>
    //     <ScrollableBarChart
    //       data={chartData}
    //       title={title}
    //       xKey="label"
    //       bars={[{ dataKey: "value", name: "Quantidade" }]}
    //       colors={ColorPalette.default}
    //       heightPerCategory={50}
    //       widthY={130}
    //       left={-15}
    //     />
    //   </ChartGrabber>
    // </div>
  );
};

export default ItbiOcupacao;
