"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaAno } from "@/functions/process_data/observatorio/aeroporto/geral/cargaAno";

const CargaAno = ({
  data = [],
  nameKey = "mes",
  colors = ColorPalette.default,
  title = "Carga Total ao Longo do Ano",
}: any) => {
  
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
