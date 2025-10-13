import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosGenero"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosFaixaEtaria"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosRaca"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosGrauInstrucao"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosDeficiencia"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/demografia/EmpregosSetor"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
];

export default charts;