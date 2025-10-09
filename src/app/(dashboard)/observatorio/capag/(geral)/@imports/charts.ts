import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagEndividamentoNotas"
      )
    ),
    col: 'col-span-4',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagLiquidezNotas"
      )
    ),
    col: 'col-span-2',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagPoupancaCorrenteNotas"
      )
    ),
    col: 'col-span-2',
  },
];

export default charts;