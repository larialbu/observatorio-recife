import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/porto/passageiro/PassageirosIndicadores"
        )
    ),
    col: 'col-span-3'
  },
];

export default tables;
