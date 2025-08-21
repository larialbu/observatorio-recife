import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagEndividamentoNotas"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagLiquidezNotas"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/capag/geral/CapagPoupancaCorrenteNotas"
      )
    ),
  },
];

export default charts;