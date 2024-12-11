"use client";

import React from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { prepareCargasPorNaturezaData } from "@/functions/process_data/observatorio/aeroporto/cargaPorNatureza";

const CargasPorNatureza = ({
  data,
  title = "Cargas por Natureza do Voo",
  year,
}: any) => {
  const chartData = prepareCargasPorNaturezaData(data, year, "RECIFE");
  console.log("Dados brutos:", data);
  console.log("Dados processados:", chartData);

  return (
    <div className="relative bg-white w-full p-4">
      <PieChart
        data={chartData}
        title={title}
        dataKey="total"
        nameKey="natureza"
        colors={ColorPalette.default}
        showPercentages={true}
      />
    </div>
  );
};

export default CargasPorNatureza;
