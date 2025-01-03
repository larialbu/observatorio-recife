"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processValoresImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/valoresImportacaoExportacao";
import { getDateKeys } from "@/utils/formatters/getDataKeys";

const CargasAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Valores Importação e Exportação",
}: any) => {

  const chartData = processValoresImportacaoExportacao(data);


  const lines = getDateKeys(["importacao", "exportacao"]);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={lines}
          tooltipEntry=" dólares"
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasAnoComparativo;
