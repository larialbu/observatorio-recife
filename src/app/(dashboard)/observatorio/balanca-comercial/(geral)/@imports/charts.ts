import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ValoresImportacaoExportacao"
      )
    ),
    col: 'col-span-4',
  },
  {
    Component: React.lazy(() => 
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/TotalImportacaoExportacao"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ContinenteImportacaoExportacao"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/PaisImportacaoExportacao"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ProdutosImportacaoExportacao"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;
