import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/balanca_comercial/comercial/NegociadoCard"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/balanca_comercial/comercial/SaldoCard"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/balanca_comercial/comercial/ExportacaoCard"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/balanca_comercial/comercial/ImportacaoCard"
      )
    ),
  },
];

export default cards;
