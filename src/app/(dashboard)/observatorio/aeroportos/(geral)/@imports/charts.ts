import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosAno"
      )
    ),
    col: 'col-span-2' 
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/CargaAno"
      )
    ),
    col: 'col-span-2' 
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorAeroporto"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/CargaPorAeroporto"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/DecolagemPorAeroporto"
      )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorNatureza"
      )
    ),
    col: 'col-span-1'
  },
];

export default charts;
