import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/micro-caged/comparativo-mov/AdmitidosComparativo"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/micro-caged/comparativo-mov/DemitidosComparativo"
      )
    ),
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/micro-caged/comparativo-mov/SaldoComparativo"
      )
    ),
  },  
];

export default cards;
