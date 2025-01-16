import React, { Component } from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ValoresImportacaoExportacao"
      )
    )
  },
  {
    Component: React.lazy(() => 
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/TotalImportacaoExportacao"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ContinenteImportacaoExportacao"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/PaisImportacaoExportacao"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/balanca-comercial/comercial/ProdutosImportacaoExportacao"
      )
    )
  },
];

export default charts;
