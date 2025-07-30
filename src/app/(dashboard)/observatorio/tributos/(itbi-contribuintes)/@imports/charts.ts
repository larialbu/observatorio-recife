import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/tributos-itbi-contribuintes/ItbiBairro"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/tributos-itbi-contribuintes/ItbiTipoConstrucao"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/tributos-itbi-contribuintes/ItbiMes"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/tributos-itbi-contribuintes/ItbiOcupacao"
      )
    ),
  },
];

export default charts;