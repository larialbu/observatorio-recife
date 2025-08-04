import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/tributos/itbi-avaliacoes/ItbiMaiorAvaliacao"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/tributos/itbi-avaliacoes/ItbiMenorAvaliacao"
      )
    ),
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/tributos/itbi-avaliacoes/ItbiTotalAvaliacao"
      )
    ),
  },
];

export default cards;