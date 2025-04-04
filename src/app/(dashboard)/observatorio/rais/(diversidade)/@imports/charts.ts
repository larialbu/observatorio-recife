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

];

export default charts;