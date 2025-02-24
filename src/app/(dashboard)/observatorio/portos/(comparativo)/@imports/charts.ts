import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/OperacaoCargasAno"
        )
    ),
    col: 'full'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/PaisesExportados"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/PaisesImportados"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/porto/comparativo/PrincipaisProdutos"
        )
    ),
  },
];


export default charts;
