import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/desligamento/TotalDesligamentos"
      )
    ),
  },
];

export default cards;