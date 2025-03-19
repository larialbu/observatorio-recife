import React, { Component } from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibAnoCapita"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibAnoVariacaoCapita"
      )
    )
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
