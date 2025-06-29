"use client";

import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";
import { ChartBuild } from "@/@types/observatorio/shared";
import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processComercializacaoPorProduto } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/produtosImportacaoExportacao";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const ImportacaoExportacaoContinente = ({
  data = [],
  colors = ColorPalette.default,
  title="Produtos Comercializados"
}: ChartBuild<BalancaHeaders[]>) => {
  const chartData = processComercializacaoPorProduto(data);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <StackedBarChart
        data={chartData}
        colors={colors.slice(1)}
        title={title}
        xKey="descricao"
        bars={[
          { 
            dataKey: "importacao", 
            name: "Importação",
            showPercentage: true,
            percentageField: "percentualImportacao",
          },
          { 
            dataKey: "exportacao", 
            name: "Exportação",
            showPercentage: true,
            percentageField: "percentualExportacao",
          },
        ]}
        tooltipEntry=" dólares"
        heightPerCategory={60}  // Define a altura de cada categoria (barra)
        visibleHeight={400}
        widthY={150}
        left={-8}
        yFontSize={11}
        tooltipTitleFontSize={13}
      />
      </ChartGrabber>
      
    </div>
  );
};

export default ImportacaoExportacaoContinente;
