import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/aena/CargasTotalAena"
      )
    ),
  },
   {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/aena/CargasRankinAena"
      )
    ),
  },
];

export default cards;