import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoComparativo"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoVariacaoComparativo"
        )
    ),
  },
];

export default charts;
