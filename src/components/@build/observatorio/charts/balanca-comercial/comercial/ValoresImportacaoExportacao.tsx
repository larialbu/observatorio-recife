"use client";

import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processValoresImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/valoresImportacaoExportacao";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { ChartBuild } from "@/@types/observatorio/shared";
import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

const CargasAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Valores Importação e Exportação",
  months
}: ChartBuild<BalancaHeaders[]>) => {

  const chartData = processValoresImportacaoExportacao(data);

  const updatedData = updatedMonthChartData(chartData, months ?? 1);

  return (
    <div className="chart-wrapper">
  <ChartGrabber>
    <LineChart
      data={updatedData}
      title={title}
      colors={[colors[0], colors[1]]}
      xKey="mes"
      lines={[
        { dataKey: "importacao", name: "Importação" },
        { dataKey: "exportacao", name: "Exportação" },
      ]}
      tooltipEntry=" dólares"
    />
  </ChartGrabber>
</div>

  );
};

export default CargasAnoComparativo;
