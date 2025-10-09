import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/operacao/OperacaoCargasAno"
      )
    ),
    col: 'col-span-full'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/operacao/PrincipaisProdutos"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/operacao/PaisesImportados"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/operacao/PaisesExportados"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;
