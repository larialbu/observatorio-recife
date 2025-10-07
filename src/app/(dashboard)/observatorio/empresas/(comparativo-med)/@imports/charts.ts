import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-med/ComparativoMedia"
        )
    ),
    col: 'col-span-full'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/comparativo-med/ComparativoVariacao"
        )
    ),
    col: 'col-span-full'
  },
];

export default charts;
