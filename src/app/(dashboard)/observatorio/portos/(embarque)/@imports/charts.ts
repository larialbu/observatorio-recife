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
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/operacao/PaisesImportados"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/porto/operacao/PaisesExportados"
      )
    ),
  },
];

export default charts;
