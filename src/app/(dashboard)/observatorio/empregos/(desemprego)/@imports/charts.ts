import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/desemprego/TaxaDesempregoAno"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/desemprego/TaxaDesempregoCapitais"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;
