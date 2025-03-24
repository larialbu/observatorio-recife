import React, { Component } from "react";

const charts = [
  {
    id: 'pib-geral-1',
    order: 1,
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibAno"
      )
    ),
  },
  {
    id: 'pib-geral-2',
    order: 2,
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibAnoVariacao"
      )
    )
  },
  {
    id: 'pib-geral-3',
    order: 3,
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibRegiao"
      )
    )
  },
  {
    id: 'pib-geral-4',
    order: 4,
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibEstado"
      )
    )
  },
  {
    id: 'pib-geral-5',
    order: 5,
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/pib/geral/PibMunicipio"
      )
    )
  },
];

export default charts;
