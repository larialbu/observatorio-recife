import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/pib/comparativo/PibInfosComparativo"
        )
    ),
  },
];

export default tables;
