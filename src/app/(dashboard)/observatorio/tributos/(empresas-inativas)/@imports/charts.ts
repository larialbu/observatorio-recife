import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresasBairro"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresaGrupo"
      )
    ),
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresasDescricao"
      )
    ),
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-inativas/EmpresasMes"
      )
    ),
  },
];

export default charts;