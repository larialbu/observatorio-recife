"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCapagAnoPilar } from "@/functions/process_data/observatorio/capag/geral/capagAnoPilar";
import { processItbiMediana } from "@/functions/process_data/observatorio/tributos/itbi-avaliacoes/itibiMesMediana";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { get } from "sortablejs";

const CapagLiquidezNotas = ({
  data,
  colors = ColorPalette.default,
  title = "Capag Liquidez Notas",
  }: any) => {
    type DataMunicipio = { Município: string }[]

    const uniqueMunicipios: string[] = getUniqueValues((data || []) as DataMunicipio, 'Município');

    const chartData = processCapagAnoPilar(data, 'Liquidez')
      .sort((a: any, b: any) => +a['label'] - +b['label'])

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="label"
            lines={[...getDateKeys(uniqueMunicipios ?? [])]}
          />
        </ChartGrabber>
      </div>
    );
  };
  

export default CapagLiquidezNotas;
