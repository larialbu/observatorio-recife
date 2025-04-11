import React from "react";

const charts = [
    {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeDeficiencia"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeGrauInstrucao"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeGenero"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeDistribuicao"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeSetor"
      )
    ),
  },
];

export default charts;