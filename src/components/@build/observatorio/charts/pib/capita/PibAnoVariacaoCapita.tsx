"use client";

import React from "react";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPIBvariacao } from "@/functions/process_data/observatorio/pib/geral/pibAnoVariacao";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PibAnoVariacaoCapita = ({
    data = [],
    colors = ColorPalette.default,
    title = "PIB Variação ao Longo do Ano",
    months
  }: any) => {
  
    const chartData = processPIBvariacao(data.geral.flat(), true)
  
    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="ano"
            lines={[
              { dataKey: "variacao", name: "PIB", strokeWidth: 2 },
            ]}
          />
        </ChartGrabber>
      </div>
    );
  };

export default PibAnoVariacaoCapita;
