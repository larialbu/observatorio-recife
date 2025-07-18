import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-med/ComparativoMedia"
        )
    ),
    col: 'full'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-med/ComparativoVariacao"
        )
    ),
    col: 'full'
  },
];

export default charts;
