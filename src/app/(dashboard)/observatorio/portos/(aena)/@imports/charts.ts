import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosPortoAno"
      )
    ),
    col: 'col-span-full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosVariacaoPortoAno"
      )
    ),
    col: 'col-span-full'
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
