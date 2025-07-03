"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasMesAtivasInativas = ({
  data,
  colors = ColorPalette.default,
  title = "Quantidade de Empresas Ativas e Inativas",
  }: any) => {

  const uniqueArrays = Array.from(new Set([...Object.keys(data['ativas']['mes']), ...Object.keys(data['inativas']['mes'])]))

  const chartData = uniqueArrays.map((key: string) => {
    const ativaNum = data['ativas']['mes'][key] || 0
    const inativaNum = data['inativas']['mes'][key] || 0

    return { label: monthShortName(+key), ativa: ativaNum, inativa: inativaNum } 
  }).sort((a, b) => (b['ativa'] + b['inativa']) - (a['ativa'] + a['inativa']))

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="label"
            lines={[{ dataKey: "ativa", name: "Empresas Ativas", strokeWidth: 2 }, { dataKey: "inativa", name: "Empresas Inativas", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };

export default EmpresasMesAtivasInativas;
