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
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoComparativoCapita"
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
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoVariacaoComparativoCapita"
        )
    ),
  },
];

export default charts;
