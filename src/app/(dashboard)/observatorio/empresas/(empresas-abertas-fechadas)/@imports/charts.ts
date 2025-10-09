import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasMesAtivasInativas"
      )
    ),
    col: 'col-span-full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasNaturezaAtivasInativas"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-abertas-fechadas/EmpresasPorteAtivasInativas"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;