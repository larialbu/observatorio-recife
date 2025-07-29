import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoAbertura"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoRegistro"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoViabilidade"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaAbertura"
      )
    ),
  },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasNaturezaAtivasInativas"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasPorteAtivasInativas"
  //     )
  //   ),
  // },
];

export default charts;