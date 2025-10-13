import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/aeroporto/comparativo/AeroportoInfo"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
];

export default tables;
