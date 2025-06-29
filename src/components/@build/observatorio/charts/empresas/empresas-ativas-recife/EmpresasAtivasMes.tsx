"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasAtivasMes = ({
  data = [],
  colors = ColorPalette.default,
  title = "Quantidade de Empresas Ativas no Recife",
  }) => {
 
    const chartData = data.map((dataMap) => ({ mes: dataMap['Mês'], empresas: dataMap['Empresas Ativas'] }))

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="mes"
            lines={[{ dataKey: "empresas", name: "Empresas Ativas", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default EmpresasAtivasMes;
