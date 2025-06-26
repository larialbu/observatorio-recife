import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/VinculosEmpregaticios"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoRaca"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoSexo"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoAtivEconomica"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoEtaria"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoHoras"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoGrupo"
      )
    ),
  },
    {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/movimentacao/MovimentacaoSalario"
      )
    ),
  },
];

export default charts;