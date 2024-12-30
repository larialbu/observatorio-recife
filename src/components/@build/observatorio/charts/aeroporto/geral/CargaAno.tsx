"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaAno } from "@/functions/process_data/observatorio/aeroporto/cargaAno";

const CargaAno = ({
  data = [],
  nameKey = "mes",
  colors = ColorPalette.default,
  title = "Carga Total ao Longo do Ano",
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

  // Dados já filtrados são processados diretamente no gráfico
  const chartData = processCargaAno(data);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey={nameKey}
          lines={[{ dataKey: "carga", name: "Carga (kg)", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargaAno;
