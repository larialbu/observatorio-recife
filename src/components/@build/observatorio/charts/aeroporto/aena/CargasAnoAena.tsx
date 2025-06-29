"use client";

import { AenaCargasHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCargaAnoAena } from "@/functions/process_data/observatorio/aeroporto/aena/cargasAnoAena";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const CargasAnoAena = ({
    data = [],
    colors = ColorPalette.default,
    title = "Cargas ao Longo do Ano",
    months
  }: ChartBuild<AenaCargasHeaders[]>) => {
 
    const chartData = processCargaAnoAena(data);
  
    const updatedData = updatedMonthChartData(chartData, months ?? 1);

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={updatedData}
            title={title}
            colors={colors}
            xKey="mes"
            lines={[{ dataKey: "quantidade", name: "Cargas (ton)", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default CargasAnoAena;
