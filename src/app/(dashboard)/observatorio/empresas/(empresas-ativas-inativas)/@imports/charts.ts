import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-inativas/EmpresasMesAtivasInativas"
      )
    ),
    col: 'col-span-3 md:col-span-6 xl:col-span-12'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-inativas/EmpresasBairroAtivasInativas"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-ativas-inativas/EmpresasDescricaoAtivasInativas"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
];

export default charts;