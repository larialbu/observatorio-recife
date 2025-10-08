import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/CargasAnoAena"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/aena/CargasAeroportoAena"
      )
    ),
  },
];

export default charts;