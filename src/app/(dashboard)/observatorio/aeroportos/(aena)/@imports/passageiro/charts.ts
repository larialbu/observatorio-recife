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
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/PassageirosPorClassificacaoAena"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/PassageirosPorEscalaAena"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;