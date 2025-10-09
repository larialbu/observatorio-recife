import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoAbertura"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoRegistro"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoViabilidade"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaAbertura"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
];

export default charts;