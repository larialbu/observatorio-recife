import React from "react";

const charts = [
    {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeDeficiencia"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeGrauInstrucao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeGenero"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeDistribuicao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/diversidade/DiversidadeSetor"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;