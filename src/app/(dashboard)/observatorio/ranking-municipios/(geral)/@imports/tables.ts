import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/ranking-municipios/MunipiosRanking"
        )
    ),
  },
];

export default tables;
