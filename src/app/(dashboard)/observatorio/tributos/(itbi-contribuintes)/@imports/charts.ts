import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiMes"
      )
    ),
    col: 'col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiBairro"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiTipoConstrucao"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiOcupacao"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;