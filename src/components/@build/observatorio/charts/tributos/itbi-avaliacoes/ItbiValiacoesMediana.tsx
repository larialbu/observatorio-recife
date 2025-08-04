"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processItbiMediana } from "@/functions/process_data/observatorio/tributos/itbi-avaliacoes/itibiMesMediana";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const ItbiValiacoesMediana = ({
  data,
  colors = ColorPalette.default,
  title = "Mediana Valor por Mês",
  }: any) => {
    const dataRawData = data?.['rawData']?.['mes'] || {}
    
    const chartData = processItbiMediana(dataRawData, true);

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="label"
            lines={[{ dataKey: "value", name: "Valor", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  

export default ItbiValiacoesMediana;
