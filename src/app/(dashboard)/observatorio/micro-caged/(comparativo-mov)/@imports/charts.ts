import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-mov/ComparativoMovimentacao"
        )
    ),
    // col: 'col-span-full'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-mov/ComparativoSaldo"
        )
    ),
  },
];

export default charts;
