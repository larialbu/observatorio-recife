"use client";

import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processValoresImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/valoresImportacaoExportacao";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";

const CargasAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Valores Importação e Exportação",
  months
}: any) => {

  const chartData = processValoresImportacaoExportacao(data);

  const updatedData = updatedMonthChartData(chartData, months);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[...getDateKeys(["importacao", "exportacao"])]}
          tooltipEntry=" dólares"
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasAnoComparativo;
