import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/OperacaoCargasAno"
        )
    ),
    col: 'col-span-full'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/PaisesExportados"
        )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/PaisesImportados"
        )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/PrincipaisProdutos"
        )
    ),
    col: 'col-span-1'
  },
];


export default charts;
