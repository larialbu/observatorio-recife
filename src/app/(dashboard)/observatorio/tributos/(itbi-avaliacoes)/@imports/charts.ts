import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-avaliacoes/ItbiValiacoesMediana"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-avaliacoes/ItbiAvaliacoesBairroValor"
      )
    ),
    col: 'col-span-3 md:col-span-6'
  },

];

export default charts;