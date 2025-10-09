import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/RelatorioAno"
      )
    ),
    col: 'col-span-2',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoAno"
      )
    ),
    col: 'col-span-2',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/RelatorioGeral"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoRegiao"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoUf"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoMunicipio"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;
