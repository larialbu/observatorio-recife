import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasAtivasNaturezaMes"
      )
    ),
    col: 'col-span-3 md:col-span-6 xl:col-span-12'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasNatureza"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasMunicipioNatureza"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
];

export default charts;