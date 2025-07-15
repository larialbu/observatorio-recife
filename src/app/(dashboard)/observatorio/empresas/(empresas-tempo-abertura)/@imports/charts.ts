import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-tempo-abertura/EmpresasMediaMesTempoAbertura"
      )
    ),
    col: 'full'
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