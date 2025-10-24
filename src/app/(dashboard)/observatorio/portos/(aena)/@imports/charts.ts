import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosPortoAno"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosVariacaoPortoAno"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/passageiro/PassageirosOperacaoPorto"
      )
    ),
    col: 'col-span-full'
  },
];

export default charts;
