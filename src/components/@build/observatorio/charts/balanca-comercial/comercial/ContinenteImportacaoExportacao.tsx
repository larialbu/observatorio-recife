"use client";

import React from "react";
import StackedBarChart from "@/components/@global/charts/StackedBarChartVertical";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorContinente } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/continentesImportacaoExportacao";

const ImportacaoExportacaoContinente = ({
  data = [],
  colors = ColorPalette.default,
  title="Importação vs Exportação por Continente"
}: any) => {
  const chartData = processImportacaoExportacaoPorContinente(data);

  return (
    <div className="relative bg-white w-full p-4">
      <StackedBarChart
        data={chartData}
        title={title}
        colors={colors}
        xKey="continente"
        bars={[
          { dataKey: "importacao", name: "Importação" },
          { dataKey: "exportacao", name: "Exportação" },
        ]}
        tooltipEntry=" dólares"
        heightPerCategory={80} // Define a altura de cada barra
        visibleHeight={400} // Define a altura visível para scroll
      />
    </div>
  );
};

export default ImportacaoExportacaoContinente;
