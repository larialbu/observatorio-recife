"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { preparePassageirosPorOperacaoData } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosPorOperacao";
import { ChartBuild } from "@/@types/observatorio/shared";
import { PortoPassageirosOutputData } from "@/@types/observatorio/@data/portoData";

const PassageirosOperacaoPorto = ({
  data,
  title = "Passageiros por tipo de Operação",
}: ChartBuild<PortoPassageirosOutputData>) => {
  const [showPercentage, setShowPercentage] = useState(true);
  
  const chartData = preparePassageirosPorOperacaoData(data.passageiros.current);

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
          dataKey="total"
          nameKey="operacao"
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosOperacaoPorto;
