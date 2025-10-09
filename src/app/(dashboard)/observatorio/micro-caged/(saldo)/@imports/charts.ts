import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/SaldoInstrucao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/VinculosEmpregaticios"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoRaca"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoSexo"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoAtivEconomica"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoEtaria"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoHoras"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoGrupo"
      )
    ),
    col: 'col-span-3'
  },
    {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/micro-caged/saldo/MovimentacaoSalario"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;