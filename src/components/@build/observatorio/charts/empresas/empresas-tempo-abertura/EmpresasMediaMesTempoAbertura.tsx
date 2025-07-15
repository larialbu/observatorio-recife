"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasMediaMesTempoAbertura = ({
  data,
  colors = ColorPalette.default,
  toCompare,
  title = "Quantidade de Empresas Abertas e Fechadas",
  }: any) => {

    console.log('DAta GRAPH ->', data)

    const dataGroup = toCompare.map((compare: string) => data[compare]['mes'])

    console.log('DATAGROUP', dataGroup)

    // const dataAtivas = data?.['ativas']
    // const dataInativas = data?.['inativas']

    // const uniqueArrays = Array.from(new Set([...Object.keys(dataAtivas?.['mes'] || {}), ...Object.keys(dataInativas?.['mes'] || {})]))

    // const chartData = uniqueArrays.map((key: string) => {
    //   const ativaNum = dataAtivas['mes'][key] || 0
    //   const inativaNum = dataInativas['mes'][key] || 0

    //   return { label: key, ativa: ativaNum, inativa: inativaNum } 
    // }).sort((a, b) => +a['label'] - +b['label']).map((obj) => ({ ...obj, label: monthShortName(+obj.label) }))

    return (
      <div className="chart-wrapper">
        <p>LINE GRAPH!</p>
        {/* <ChartGrabber>
          <LineChart
            data={chartData}
            title={title + ` - (${municipio})`}
            colors={colors}
            xKey="label"
            lines={[{ dataKey: "ativa", name: "Empresas Ativas", strokeWidth: 2 }, { dataKey: "inativa", name: "Empresas Inativas", strokeWidth: 2 }]}
          />
        </ChartGrabber> */}
      </div>
    );
  };

export default EmpresasMediaMesTempoAbertura;
