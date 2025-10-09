import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosGenero"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GruposDistribuicaoSecao"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GruposDistribuicaoClasses"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GruposDistribuicaoGrupos"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/grupo/GrupoSetor"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;