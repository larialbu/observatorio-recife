import React from "react";

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/operacao/MovimentacaoGeral"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/operacao/MovimentacaoTotal"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/operacao/MovimentacaoImportacao"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/cards/porto/operacao/MovimentacaoExportacao"
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
