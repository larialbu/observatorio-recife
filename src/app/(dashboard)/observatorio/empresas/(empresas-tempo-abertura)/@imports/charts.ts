import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoAbertura"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoRegistro"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoViabilidade"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaAbertura"
      )
    ),
    col: 'col-span-2'
  },
];

export default charts;