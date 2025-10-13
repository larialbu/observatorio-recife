import React, { Component } from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibAno"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibAnoVariacao"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibRegiao"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibEstado"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibMunicipio"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
];

export default charts;
