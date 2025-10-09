import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasAtivasNaturezaMes"
      )
    ),
    col: 'col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasNatureza"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasMunicipioNatureza"
      )
    ),
    col: 'col-span-2'
  },
];

export default charts;