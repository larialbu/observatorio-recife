"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { processGroupsValues } from "@/functions/process_data/observatorio/empregos/caged/cagedGroupsValues";
import { processDesempregoTaxaCapital } from "@/functions/process_data/observatorio/empregos/desemprego/desempregoTaxaCapital";
import { capitaisCoordsDicts } from "@/utils/dicts/empregos/desemprego/capitaisCoordsDicts";

const TaxaDesempregoCapitais = ({
  data,
  title = "Taxa de desemprego ",
  year,
}: any) => {
  
  const dataDesemprego = data['desemprego']
  
  const quarter = dataDesemprego.reduce((acc: number, obj: any) => {
      const data = +obj['Trimestre'].split('º')[0]
      acc = acc <= data ? data : acc

      return acc
    }, 0)

  const dataFiltred = dataDesemprego.filter((obj: any) => +obj['Trimestre'].split('º')[0] == quarter)

  const chartData = processDesempregoTaxaCapital(dataFiltred)
  
  const titleAdd = title + `- (${dataFiltred[0]['Trimestre']})`

  console.log('CAHRtData', chartData.map((obj) =>  ({ ...obj, ...capitaisCoordsDicts[obj['label']] })))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={titleAdd}
          xKey="label"
          bars={[{ dataKey: "value", name: "Taxa" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default TaxaDesempregoCapitais;
