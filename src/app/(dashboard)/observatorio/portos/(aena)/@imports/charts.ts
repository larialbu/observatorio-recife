import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosPortoAno"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosVariacaoPortoAno"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosOperacaoPorto"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;
