import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-mov/ComparativoMovimentacao"
        )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-mov/ComparativoSaldo"
        )
    ),
    col: 'col-span-2'
  },
];

export default charts;
