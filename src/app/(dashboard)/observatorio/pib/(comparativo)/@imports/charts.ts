import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoComparativo"
        )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoComparativoCapita"
        )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoVariacaoComparativo"
        )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/pib/comparativo/PibAnoVariacaoComparativoCapita"
        )
    ),
    col: 'col-span-2'
  },
];

export default charts;
