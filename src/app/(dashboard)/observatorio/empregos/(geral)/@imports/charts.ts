import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/RelatorioAno"
      )
    ),
    col: 'col-span-3 md:col-span-6',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoAno"
      )
    ),
    col: 'col-span-3 md:col-span-6',
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/RelatorioGeral"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoRegiao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoUf"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/empregos/geral/SaldoMunicipio"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;
