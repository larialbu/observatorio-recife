import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/desligamento/DesligamentosAno"
      )
    ),
    col: 'col-span-4',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/desligamento/DesligamentosMotivo"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/desligamento/DesligamentosGenero"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/desligamento/DesligamentosFaixaEtaria"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/rais/desligamento/DesligamentosSetor"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;