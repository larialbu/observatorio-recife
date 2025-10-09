import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-recife/EmpresasAtivasMes"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-recife/EmpresasVariacaoAtivasMes"
      )
    ),
    col: 'col-span-2'
  },  
];

export default charts;