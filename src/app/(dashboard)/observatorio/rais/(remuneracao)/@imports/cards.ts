import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/comparativo/PassageirosCardComparativo"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/comparativo/CargasCardComparativo"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/comparativo/DecolagensCardComparativo"
      )
    ),
  },
];

export default cards;
