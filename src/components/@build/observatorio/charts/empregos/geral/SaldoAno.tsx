"use client";

import React from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCargaAno } from "@/functions/process_data/observatorio/aeroporto/geral/charts/cargaAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const SaldoAno = ({
  data,
  nameKey = "Mês",
  colors = ColorPalette.default,
  title = "Saldo ao Longo do Ano",
  months,
}: any) => {
  
  const chartData = data['municipios'].sort((a: any, b: any) => a["Mês"] - b["Mês"]).map((data: any) => ({ ...data, "Mês": monthShortName(data['Mês'])}));

  const updatedData = updatedMonthChartData(chartData, months ?? 1);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey={nameKey}
          lines={[{ dataKey: "Saldos", name: "Saldo", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default SaldoAno;
