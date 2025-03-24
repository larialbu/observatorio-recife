import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/pib/capita/PibAtualCapita"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/pib/capita/PibVariacaoCapita"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/pib/capita/PibPosicaoCapita"
      )
    ),
  },
];

export default cards;
