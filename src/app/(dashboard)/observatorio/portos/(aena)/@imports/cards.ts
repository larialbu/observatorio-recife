import React from "react";

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/passageiro/PassageirosGeral"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/passageiro/TotalPassageirosPorto"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/passageiro/TotalPassageirosPortoAnterior"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/passageiro/VariacaoPassageirosPorto"
        )
    ),
  },
];

export default cards;
