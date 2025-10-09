import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-contribuintes/IptuBairro"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-contribuintes/IptuZona"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-contribuintes/IptuTipoImovel"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;