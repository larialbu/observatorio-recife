import React from "react";

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/ipca/analitico/VariacaoMensalCardIpca"
        )
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/ipca/analitico/AcumuladoAnoCardIpca"
        )
    ),
    col: 'col-span-3'
  },
];

export default cards;
