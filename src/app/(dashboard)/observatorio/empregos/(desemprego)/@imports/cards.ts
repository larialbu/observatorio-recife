import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empregos/desempregos/TaxaTrimestre"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empregos/desempregos/TaxaTrimestreAnterior"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empregos/desempregos/VariacaoTrimesteAnterior"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empregos/desempregos/TaxaTrimestreAnoAnterior"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empregos/desempregos/VariacaoAno"
      )
    ),
  },
];

export default cards;
