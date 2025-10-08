import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/PassageirosPorAnoAena"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/PassageirosAeroportoAena"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/PassageirosPorClassificacaoAena"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/PassageirosPorEscalaAena"
      )
    ),
  },
];

export default charts;