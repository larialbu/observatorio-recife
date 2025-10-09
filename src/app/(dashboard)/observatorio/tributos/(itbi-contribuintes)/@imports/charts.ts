import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiMes"
      )
    ),
    col: 'col-span-3 md:col-span-6 xl:col-span-12'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiBairro"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiTipoConstrucao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-contribuintes/ItbiOcupacao"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;