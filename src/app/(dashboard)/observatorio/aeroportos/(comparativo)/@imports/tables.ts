import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/aeroporto/comparativo/AirportInfo"
        )
    ),
  },
];

export default tables;
