import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-inativas/EmpresasMesAtivasInativas"
      )
    ),
    col: 'col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-inativas/EmpresasBairroAtivasInativas"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-inativas/EmpresasDescricaoAtivasInativas"
      )
    ),
    col: 'col-span-2'
  },
];

export default charts;