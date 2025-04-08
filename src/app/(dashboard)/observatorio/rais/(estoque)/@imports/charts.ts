import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueCeiVinculado"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueSimplesNacional"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/estoque/EstoqueTamanhoEmpresa"
      )
    ),
  },
];

export default charts;