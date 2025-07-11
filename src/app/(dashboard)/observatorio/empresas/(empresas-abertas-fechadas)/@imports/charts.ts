import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasMesAtivasInativas"
      )
    ),
    col: 'full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasNaturezaAtivasInativas"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasPorteAtivasInativas"
      )
    ),
  },
];

export default charts;