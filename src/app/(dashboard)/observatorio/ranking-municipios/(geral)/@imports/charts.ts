import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/ranking-municipios/geral/RankingCompetitividadeMunicipios"
      )
    ),
    title: "",
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/ranking-municipios/geral/VariacaoCompetitividadeMunicipios"
      )
    ),
    title: "",
  },
];

export default charts;
