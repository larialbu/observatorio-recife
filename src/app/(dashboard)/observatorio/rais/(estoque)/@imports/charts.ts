import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueCeiVinculado"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueSimplesNacional"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueTamanhoEmpresa"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;