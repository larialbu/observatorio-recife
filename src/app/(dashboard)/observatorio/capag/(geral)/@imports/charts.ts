import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagEndividamentoNotas"
      )
    ),
    col: 'col-span-3 md:col-span-6 xl:col-span-12',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagLiquidezNotas"
      )
    ),
    col: 'col-span-3 md:col-span-6',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagPoupancaCorrenteNotas"
      )
    ),
    col: 'col-span-3 md:col-span-6',
  },
];

export default charts;