import React from "react";

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/comparativo/MovimentacaoGeral"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/comparativo/MovimentacaoTotal"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/comparativo/MovimentacaoImportacao"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/comparativo/MovimentacaoExportacao"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/operacao/MovimentacaoCabotagem"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/operacao/MovimentacaoOutros"
        )
    ),
  },
];

export default cards;
