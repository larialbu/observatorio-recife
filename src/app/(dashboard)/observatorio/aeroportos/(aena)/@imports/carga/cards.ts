import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/geral/PassageirosMesRecente"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/geral/CargasMesRecente"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/aeroporto/geral/DecolagensMesRecente"
      )
    ),
  },
];

export default cards;