import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosAno"
      )
    ),
    col: 'col-span-3 md:col-span-6' 
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/CargaAno"
      )
    ),
    col: 'col-span-3 md:col-span-6' 
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorAeroporto"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/CargaPorAeroporto"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/DecolagemPorAeroporto"
      )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorNatureza"
      )
    ),
    col: 'col-span-3'
  },
];

export default charts;
