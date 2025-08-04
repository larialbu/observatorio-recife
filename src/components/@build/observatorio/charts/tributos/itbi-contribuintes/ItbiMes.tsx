"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const ItbiMes = ({
  data,
  colors = ColorPalette.default,
  title = "Transmissões por Mês",
  }: any) => {
    const dataItbi = data['rawData']

    const chartData = getObjToArr<number>(dataItbi['mes'] || {}).sort((a, b) => +a.label - +b.label).map((dataMap) => ({ ...dataMap, label: monthShortName(+dataMap.label)}))

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="label"
            lines={[{ dataKey: "value", name: "Transmissões", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default ItbiMes;
