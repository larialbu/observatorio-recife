import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/micro-caged/salario/ComparativoCbo"
        )
    ),
  },
  // {
  //   Component: React.lazy(
  //     () =>
  //       import(
  //         "@/components/@build/observatorio/tables/micro-caged/salario/ComparativoCbo"
  //       )
  //   ),
  // },
  // {
  //   Component: React.lazy(
  //     () =>
  //       import(
  //         "@/components/@build/observatorio/tables/rais/remuneracao/RemuneracaoProfissao"
  //       )
  //   ),
  // },
];

export default tables;
