import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/SaldoInstrucao"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/VinculosEmpregaticios"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoRaca"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoSexo"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoAtivEconomica"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoEtaria"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoHoras"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoGrupo"
      )
    ),
  },
    {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoSalario"
      )
    ),
  },
];

export default charts;