"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processEmpresasDataLineGraph } from "@/functions/process_data/observatorio/empresas/empresas-tempo-abertura/empresasDataLineGraph";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasMediaMesTempoAbertura = ({
  data,
  colors = ColorPalette.default,
  toCompare,
  title = "Tempo Médio de Abertura de Empresas (Horas)",
  }: any) => {
    const dataCur = data['rawData'] || {}

    const chartData = processEmpresasDataLineGraph(dataCur, toCompare, 'Tempo_Medio_Abertura').map((obj) => ({ ...obj, label: monthShortName(+obj.label) }))

    return (
      <div className="chart-wrapper">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="label"
            lines={[...getDateKeys(toCompare ?? [])]}
          />
        </ChartGrabber>
      </div>
    );
  };

export default EmpresasMediaMesTempoAbertura;
