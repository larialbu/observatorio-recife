import React from "react";

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/ipca/analitico/VariacaoMensalCardIpca"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/ipca/analitico/AcumuladoAnoCardIpca"
        )
    ),
  },
];

export default cards;
