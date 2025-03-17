"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosAno } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processPIBPorAno } from "@/functions/process_data/observatorio/pib/geral/pibAno";

const PibAno = ({
  data = [],
  colors = ColorPalette.default,
  title = "Passageiros ao Longo do Ano",
  months
}: any) => {

const chartData = processPIBPorAno(data.geral.flat())

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
        //   data={updatedData}
          title={title}
          colors={colors}
          xKey="ano"
          lines={[
            { dataKey: "valor", name: "PIB", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PibAno;
