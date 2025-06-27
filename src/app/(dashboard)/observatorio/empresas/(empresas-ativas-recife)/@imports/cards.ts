import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empresas/empresas-ativas-recife/EmpresasAtivasMesRecente"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empresas/empresas-ativas-recife/EmpresasVariacaoAtivasRecente"
      )
    ),
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empresas/empresas-ativas-recife/EmpresasAtivasMediaAno"
      )
    ),
  },    
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/movimentacao/Admissoes"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/movimentacao/Desligamentos"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/movimentacao/Saldo"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/movimentacao/SaldoHomem"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/movimentacao/SaldoMulher"
  //     )
  //   ),
  // },
];

export default cards;