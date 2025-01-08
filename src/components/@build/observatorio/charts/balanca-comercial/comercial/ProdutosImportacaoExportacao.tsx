"use client";

import React from "react";
import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processComercializacaoPorProduto } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/produtosImportacaoExportacao";

const ImportacaoExportacaoContinente = ({
  data = [],
  colors = ColorPalette.default,
  title="Produtos Comercializados"
}: any) => {
  const chartData = processComercializacaoPorProduto(data);

  return (
    <div className="relative bg-white w-full p-4">
      <StackedBarChart
        data={chartData}
        colors={colors.slice(1)}
        title={title}
        xKey="descricao"
        bars={[
          { dataKey: "importacao", name: "Importação" },
          { dataKey: "exportacao", name: "Exportação" },
        ]}
        tooltipEntry=" dólares"
        heightPerCategory={60}  // Define a altura de cada categoria (barra)
        visibleHeight={400}
        left={15}
        yFontSize={11}
      />
    </div>
  );
};

export default ImportacaoExportacaoContinente;
