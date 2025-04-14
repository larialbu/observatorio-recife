"use client";

import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processCargaAnoAena } from "@/functions/process_data/observatorio/aeroporto/aena/cargasAnoAena";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AenaPassageirosData } from "@/@types/observatorio/@data/aeroportoData";

const CargasAnoAena = ({
    data,
    colors = ColorPalette.default,
    title = "Cargas ao Longo do Ano",
    months
  }: ChartBuild<AenaPassageirosData>) => {
 
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
