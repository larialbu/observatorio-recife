import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueCeiVinculado"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueSimplesNacional"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueTamanhoEmpresa"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;