"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const VariacaoEmpresasAtivasRecife = ({
  data = [],
  colors = ColorPalette.default,
  title = "Variação de Empresas Ativas no Recife",
  }) => {
 
    const chartData = data.sort((a, b) => a['mes'] - b['mes']).map((dataMap, i) => {
        if (dataMap['mes'] !== 1) {
           return { mes: dataMap['Mês'], empresas: (((dataMap['Empresas Ativas'] - data[i - 1]['Empresas Ativas']) / data[i - 1]['Empresas Ativas']) * 100).toFixed(2) }
        }
    }).filter(data => !!data)

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="mes"
            lines={[{ dataKey: "empresas", name: "Variação de Empresas Ativas", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default VariacaoEmpresasAtivasRecife;
