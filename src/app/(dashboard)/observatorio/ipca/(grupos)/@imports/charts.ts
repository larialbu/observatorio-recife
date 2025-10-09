import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/GrupoParticipacaoIpca"
        )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/SubgrupoParticipacaoIpca"
        )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/ItemParticipacaoIpca"
        )
    ),
    col: 'col-span-1'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/SubitemParticipacaoIpca"
        )
    ),
    col: 'col-span-1'
  },
];

export default charts;
