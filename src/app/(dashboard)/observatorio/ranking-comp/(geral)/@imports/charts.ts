import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/EmbarqueDesembarqueRegiao"
      )
    ),
    title: "Embarque e Desembarque por Região",
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosAno"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/CargaAno"
      )
    ),
  },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/aeroporto/geral/CargaPorNatureza"
  //     )
  //   ),
  // },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorAeroporto"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/CargaPorAeroporto"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/DecolagemPorAeroporto"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/aeroporto/geral/PassageirosPorNatureza"
      )
    ),
  },
];

export default charts;
