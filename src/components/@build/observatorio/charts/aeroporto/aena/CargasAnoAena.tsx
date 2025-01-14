"use client";

import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processCargaAnoAena } from "@/functions/process_data/observatorio/aeroporto/aena/cargasAnoAena";

const CargasAnoAena = ({
    data,
    colors = ColorPalette.default,
    title = "Cargas ao Longo do Ano",
    months
  }: any) => {
 
    const chartData = processCargaAnoAena(data);
  
    const updatedData = updatedMonthChartData(chartData, months);

    return (
      <div className="relative bg-white w-full p-4">
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
