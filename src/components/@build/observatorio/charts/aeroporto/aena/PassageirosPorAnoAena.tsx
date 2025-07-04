"use client";

import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processPassageirosAnoAena } from "@/functions/process_data/observatorio/aeroporto/aena/passageirosAnoAena";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const PassageirosAnoAena = ({
  rawData = [],
  colors = ColorPalette.default,
  title = "Passageiros ao Longo do Ano",
  months
  }: ChartBuild<AenaPassageirosHeaders[]>) => {
 
    const chartData = processPassageirosAnoAena(rawData);

    const updatedData = updatedMonthChartData(chartData, months ?? 1);


    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={updatedData}
            title={title}
            colors={colors}
            xKey="mes"
            lines={[{ dataKey: "passageiros", name: "Passageiros", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default PassageirosAnoAena;
