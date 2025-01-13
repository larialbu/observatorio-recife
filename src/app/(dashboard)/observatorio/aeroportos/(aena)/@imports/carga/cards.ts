import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/aena/CargasTotalAena"
      )
    ),
  },
 
];

export default cards;