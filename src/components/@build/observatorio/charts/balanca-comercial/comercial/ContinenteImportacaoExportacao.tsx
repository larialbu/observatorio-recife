"use client";

import React from "react";
import StackedBarChart from "@/components/@global/charts/StackedBarChartVertical";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorContinente } from "@/functions/process_data/observatorio/balanca-comercial/comercial/continentesImportacaoExportacao";

const ImportacaoExportacaoContinente = ({
  data = [],
  colors = ColorPalette.default,
}: any) => {
  const chartData = processImportacaoExportacaoPorContinente(data);
  console.log(chartData); // Verifique o formato dos dados aqui

  return (
    <div className="relative bg-white w-full p-4">
      <StackedBarChart
        data={chartData}
        title="Importação vs Exportação por Continente"
        colors={colors}
        xKey="continente"
        bars={[
          { dataKey: "importacao", name: "Importação" },
          { dataKey: "exportacao", name: "Exportação" },
        ]}
        tooltipEntry=" dólares"
      />
    </div>
  );
};

export default ImportacaoExportacaoContinente;
