import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/pib/comparativo/PibAtualComparativo"
      )
    ),
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/pib/comparativo/PibVariacaoComparativo"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/pib/comparativo/PibPosicaoComparativo"
      )
    ),
  },
];

export default cards;
