import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/geral/PassageirosMesRecente"
      )
    ),
  },
];

export default cards;
