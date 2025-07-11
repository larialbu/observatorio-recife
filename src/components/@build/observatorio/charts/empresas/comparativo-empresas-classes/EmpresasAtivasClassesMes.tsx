"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasAtivasClassesMes = ({
  data,
  toCompare,
  color = ColorPalette.default,
  title = "Quantidade de Empresas Classes no Recife",
  }: any) => {
    console.log('CHARTDADTA ->', data)

    const dataRawData = data

    const dataArr = toCompare.map((compare: string) => getObjToArr(dataRawData?.[compare]?.['municipio']?.['mes']).map((obj) => ({ ...obj, name: compare }))).flat()


    const dataCorrect: any = []

    for (let i = 0; i < dataArr.length; i++) {
      const dataMonth = dataCorrect.findIndex((val: any) => val['label'] === dataArr[i]['label'])

      if (dataCorrect[dataMonth]) {
        dataCorrect[dataMonth] = { ...dataCorrect[dataMonth], [dataArr[i]['name']]: dataArr[i]['value'] }
        continue
      }

      dataCorrect.push({ label: dataArr[i]['label'], [dataArr[i]['name']]: dataArr[i]['value'] })
    }

    const chartData = dataCorrect.map((dataMap: any) => ({ ...dataMap, label: monthShortName(+dataMap.label)}))

    
    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={color}
            xKey="label"
            lines={[...getDateKeys(toCompare ?? [])]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default EmpresasAtivasClassesMes;
