import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-valores/IptuBairro"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-valores/IptuZona"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-valores/IptuTipoImovel"
      )
    ),
  },
];

export default charts;