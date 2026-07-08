"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { CapagMunicipioData } from "@/@types/observatorio/@data/capagData";

const EvolucaoIndicador = ({
  data,
  campo,
  title,
  colors = ColorPalette.default,
}: {
  data?: { recife: CapagMunicipioData | null; comparado: CapagMunicipioData | null };
  campo: "endividamento" | "liquidez" | "poupancaCorrente";
  title: string;
  colors?: string[];
}) => {
  const recife = data?.recife;
  const comparado = data?.comparado;

  const comparadoPorAno = new Map((comparado?.historico ?? []).map((h) => [h.ano, h]));

  const chartData = (recife?.historico ?? []).map((h) => ({
    ano: h.ano,
    recife: h[campo],
    comparado: comparadoPorAno.get(h.ano)?.[campo],
  }));

  const lines = [
    { dataKey: "recife", name: "Recife" },
    ...(comparado ? [{ dataKey: "comparado", name: comparado.municipio }] : []),
  ];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart data={chartData} title={title} xKey="ano" colors={colors} lines={lines} />
      </ChartGrabber>
    </div>
  );
};

export default EvolucaoIndicador;
