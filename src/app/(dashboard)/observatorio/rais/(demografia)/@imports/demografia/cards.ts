import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/demografia/EmpregosGeral"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/demografia/TotalEmpregos"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/demografia/RemuneracaoMedia"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/rais/demografia/RemuneracaoMaior"
      )
    ),
  },
];

export default cards;