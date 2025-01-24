import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/GrupoParticipacaoIpca"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/SubgrupoParticipacaoIpca"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/ItemParticipacaoIpca"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/grupos/SubitemParticipacaoIpca"
        )
    ),
  },
];

export default charts;
