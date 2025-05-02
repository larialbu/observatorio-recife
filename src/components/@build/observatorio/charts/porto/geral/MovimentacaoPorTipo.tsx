"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { ChartBuild } from "@/@types/observatorio/shared";
import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders } from "@/@types/observatorio/@fetch/porto";

const MovimentacaoPorTipo = ({
  data,
  title = "Tipo de Transação (Ton)",
}: ChartBuild<PortoGeralData>) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = prepareCargasPorAcaoData(data.atracacao as PortoAtracacaoHeaders[], data.carga, false)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <PieChart
          data={chartData}
          title={title}
          underTitle={
            <ShowPercentages
              showPercentage={showPercentage}
              setShowPercentage={setShowPercentage}
            />
          }
          dataKey="totalPeso"
          nameKey="acao"
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default MovimentacaoPorTipo;
