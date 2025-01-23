import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/ranking-municipios/geral/RankingCompetitividadeMunicipios"
      )
    ),
    title: "Embarque e Desembarque por Região",
  },
];

export default charts;
