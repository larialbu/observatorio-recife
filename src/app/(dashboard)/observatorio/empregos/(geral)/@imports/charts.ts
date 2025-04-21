import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/RelatorioAno"
      )
    ),
  },
];

export default charts;
