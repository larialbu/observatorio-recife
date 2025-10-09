import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-recife/EmpresasAtivasMes"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-recife/EmpresasVariacaoAtivasMes"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },  
];

export default charts;