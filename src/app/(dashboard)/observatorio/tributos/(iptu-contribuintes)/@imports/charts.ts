import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-contribuintes/IptuBairro"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-contribuintes/IptuZona"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-contribuintes/IptuTipoImovel"
      )
    ),
  },
];

export default charts;