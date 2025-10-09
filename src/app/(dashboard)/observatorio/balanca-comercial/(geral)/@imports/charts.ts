import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ValoresImportacaoExportacao"
      )
    ),
    col: 'col-span-3 md:col-span-6 xl:col-span-12',
  },
  {
    Component: React.lazy(() => 
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/TotalImportacaoExportacao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ContinenteImportacaoExportacao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/PaisImportacaoExportacao"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ProdutosImportacaoExportacao"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;
