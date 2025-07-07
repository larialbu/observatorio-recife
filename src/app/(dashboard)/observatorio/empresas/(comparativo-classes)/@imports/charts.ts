import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasAtivasClassesMes"
      )
    ),
    col: 'full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasClasses"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasSecao"
      )
    ),
  },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasMunicipioClasses"
  //     )
  //   ),
  // },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasGrupo"
      )
    ),
  }, 
];

export default charts;