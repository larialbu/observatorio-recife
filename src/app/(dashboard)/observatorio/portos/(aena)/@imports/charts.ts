import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosPortoAno"
      )
    ),
    col: 'full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosVariacaoPortoAno"
      )
    ),
    col: 'full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosOperacaoPorto"
      )
    ),
  },
];

export default charts;
