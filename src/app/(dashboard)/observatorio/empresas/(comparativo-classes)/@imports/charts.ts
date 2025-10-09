import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasAtivasClassesMes"
      )
    ),
    col: 'col-span-full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasClasses"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasSecao"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empresas/comparativo-empresas-classes/EmpresasGrupo"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  }, 
];

export default charts;