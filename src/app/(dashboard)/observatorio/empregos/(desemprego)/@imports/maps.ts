import React from "react";

const maps = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/maps/empregos/desemprego/CapitaisLocalizacao"
      )
    ),
  },
];

export default maps;
