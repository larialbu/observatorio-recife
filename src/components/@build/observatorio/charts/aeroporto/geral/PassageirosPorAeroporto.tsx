"use client";

import React from "react";
import { preparePassageirosPorAeroportoData } from "@/utils/process_data/observatorio/aeroporto/passageirosPorAeroporto";
import ScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PassageirosPorAeroporto = ({
  data,
  title = "Passageiros por Aeroporto",
  year,
}: any) => {
  const chartData = preparePassageirosPorAeroportoData(data, year);

  return (
    <div className="relative bg-white w-full p-4">
      <ScrollableBarChart
        data={chartData}
        title={title}
        xKey="aeroporto"
        bars={[
          { dataKey: "total", name: "Passageiros" },
        ]}
        colors={ColorPalette.default}
        yAxisFormatter={(value: number) =>
          new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value)
        }
        tooltipFormatter={(value: number) =>
          `${value.toLocaleString("pt-BR")} passageiros`
        }
        height={500} // Altura ajustável
      />
    </div>
  );
};

export default PassageirosPorAeroporto;
