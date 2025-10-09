import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/CargasAno"
      )
    ),
    col: "col-span-4",
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/MovimentacaoPorTipo"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/PrincipaisProdutos"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/OperacaoPortos"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;
