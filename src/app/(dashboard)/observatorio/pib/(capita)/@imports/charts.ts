import React, { Component } from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibAnoCapita"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibAnoVariacaoCapita"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibRegiaoCapita"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibEstadoCapita"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibMunicipioCapita"
      )
    )
  },
];

export default charts;
