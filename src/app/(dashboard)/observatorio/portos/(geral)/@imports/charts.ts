import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/CargasAno"
      )
    ),
    col: "col-span-3 md:col-span-6 xl:col-span-12",
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/MovimentacaoPorTipo"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/PrincipaisProdutos"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/OperacaoPortos"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;
