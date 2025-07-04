import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasAtivasNaturezaMes"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasNatureza"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/empresas-naturezas/EmpresasMunicipioNatureza"
      )
    ),
  },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-ativas/EmpresasBairro"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-ativas/EmpresaGrupo"
  //     )
  //   ),
  // },  
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-ativas/EmpresasDescricao"
  //     )
  //   ),
  // },  
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-ativas/EmpresasMes"
  //     )
  //   ),
  // },
];

export default charts;