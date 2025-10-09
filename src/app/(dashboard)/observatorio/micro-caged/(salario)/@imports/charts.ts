import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/salario/MediaGrupo"
        )
    ),
    col: 'col-span-3'
  },
];

export default charts;
