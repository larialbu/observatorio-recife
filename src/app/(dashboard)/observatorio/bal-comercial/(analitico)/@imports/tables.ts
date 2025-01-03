import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/balanca-comercial/analitico/BalInfo"
        )
    ),
  },
];

export default tables;
