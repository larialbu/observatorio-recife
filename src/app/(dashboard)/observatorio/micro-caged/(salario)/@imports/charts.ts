import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/micro-caged/salario/MediaGrupo"
        )
    ),
  },
];

export default charts;
