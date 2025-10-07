import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/comparativo/PassageirosAnoComparativo"
        )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/comparativo/CargasAnoComparativo"
        )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/comparativo/DecolagensAnoComparaivo"
        )
    ),
    col: 'col-span-full'
  },
];

export default charts;
