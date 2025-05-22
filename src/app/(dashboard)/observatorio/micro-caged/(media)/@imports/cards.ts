import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/micro-caged/media/SalarioMedio"
      )
    ),
  },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/saldo/Admissoes"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/saldo/Desligamentos"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/saldo/Saldo"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/saldo/SaldoHomem"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/cards/micro-caged/saldo/SaldoMulher"
  //     )
  //   ),
  // },
];

export default cards;