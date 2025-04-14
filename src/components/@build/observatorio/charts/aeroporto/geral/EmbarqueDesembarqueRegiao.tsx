"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import BarChart from "@/components/@global/charts/BarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processEmbarqueDesembarque } from "@/functions/process_data/observatorio/aeroporto/geral/charts/embarqueDesembarqueRegiao";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";

const EmbarqueDesembarqueRegiao = ({
  data,
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "Embarque e Desembarque por Região",
  
}: ChartBuild<AnacGeralData>) => {
  const [windowWidth, setWindowWidth] = useState(768);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const chartData = processEmbarqueDesembarque(
    data,
    nameKey,
    windowWidth
  );

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <BarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey={nameKey}
          bars={[
            { dataKey: "embarque", name: "Embarques" },
            { dataKey: "desembarque", name: "Desembarques" },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default EmbarqueDesembarqueRegiao;
