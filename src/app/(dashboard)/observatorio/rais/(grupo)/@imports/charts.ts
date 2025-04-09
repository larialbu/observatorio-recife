import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosGenero"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GruposDistribuicaoSecao"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GruposDistribuicaoClasses"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GruposDistribuicaoGrupos"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GrupoSetor"
      )
    ),
  },
];

export default charts;