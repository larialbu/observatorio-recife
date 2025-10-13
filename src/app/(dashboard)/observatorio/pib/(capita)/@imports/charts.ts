import React, { Component } from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibAnoCapita"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibAnoVariacaoCapita"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibRegiaoCapita"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibEstadoCapita"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/capita/PibMunicipioCapita"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
];

export default charts;
