import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-valores/IptuBairro"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-valores/IptuZona"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/iptu-valores/IptuTipoImovel"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
];

export default charts;