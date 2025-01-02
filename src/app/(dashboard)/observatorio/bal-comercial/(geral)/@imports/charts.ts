import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorNatureza"
      )
    ),
  },
];

export default charts;
