import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/diversidade/DiversidadeGeral"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/diversidade/DiversidadeTotalEmpregos"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/diversidade/DiversidadeRemuneracaoMedia"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/diversidade/DiversidadeRemuneracaoMaior"
      )
    ),
  },
];

export default cards;