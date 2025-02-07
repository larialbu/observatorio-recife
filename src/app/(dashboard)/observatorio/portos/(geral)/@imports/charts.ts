import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/MovimentacaoPorTipo"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/geral/PrincipaisProdutos"
      )
    ),
  },
];

export default charts;
