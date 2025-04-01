import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/aeroporto/comparativo/AeroportoInfo"
        )
    ),
  },
];

export default tables;
