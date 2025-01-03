import React from "react";

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
  }
];

export default charts;
