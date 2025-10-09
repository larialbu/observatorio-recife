import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/VinculosEmpregaticios"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoRaca"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoSexo"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoAtivEconomica"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoEtaria"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoHoras"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoGrupo"
      )
    ),
    col: 'col-span-3'
  },
    {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoSalario"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;