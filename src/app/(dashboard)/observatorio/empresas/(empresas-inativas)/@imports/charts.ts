import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresasMes"
      )
    ),
    col: 'col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresasBairro"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresaGrupo"
      )
    ),
    col: 'col-span-1'
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresasDescricao"
      )
    ),
    col: 'col-span-1'
  },  
];

export default charts;