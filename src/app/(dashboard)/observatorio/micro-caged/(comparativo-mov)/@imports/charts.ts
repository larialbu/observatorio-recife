import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-mov/ComparativoMovimentacao"
        )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-mov/ComparativoSaldo"
        )
    ),
    col: 'col-span-3 md:col-span-6'
  },
];

export default charts;
