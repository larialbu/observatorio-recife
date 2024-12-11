"use client";

import React, { useEffect, useState } from "react";
import { processEmbarqueDesembarque } from "@/utils/process_data/observatorio/aeroporto/embarqueDesembarqueRegiao";
import ChartGrabber from "@/components/observatorio/ChartGrabber";
import BarChart from "@/components/@global/charts/BarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmbarqueDesembarqueRegiao = ({
  data = [],
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "Embarque e Desembarque por Região",
  year,
}: any) => {
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
    year,
    nameKey,
    windowWidth
  );

  return (
    <div className="relative bg-white w-full p-4">
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
