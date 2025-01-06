"use client";

import React from "react";
import StackerBarChartVertical from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorPais } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/paisesImportacaoExportacao";

const ImportacaoExportacaoPorPais = ({
  data = [],
  colors = ColorPalette.default,
}: any) => {
  const chartData = processImportacaoExportacaoPorPais(data);

  return (
    <div className="relative bg-white w-full p-4">
      <StackerBarChartVertical
        data={chartData}
        title="Importação vs Exportação por País"
        colors={colors.slice(1)}
        xKey="pais"
        bars={[
          { dataKey: "importacao", name: "Importação" },
          { dataKey: "exportacao", name: "Exportação" },
        ]}
        tooltipEntry=" dólares"
        heightPerCategory={60}  // Define a altura de cada categoria (barra)
        visibleHeight={400}  // Ajuste a altura do scroll
      />
    </div>
  );
};

export default ImportacaoExportacaoPorPais;
