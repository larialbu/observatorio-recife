import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/porto/passageiro/PassageirosIndicadores"
        )
    ),
  },
];

export default tables;
