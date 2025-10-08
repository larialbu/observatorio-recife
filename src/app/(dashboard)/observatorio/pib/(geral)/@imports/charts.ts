import React, { Component } from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibAno"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibAnoVariacao"
      )
    ),
    col: 'col-span-2'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibRegiao"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibEstado"
      )
    )
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibMunicipio"
      )
    )
  },
];

export default charts;
