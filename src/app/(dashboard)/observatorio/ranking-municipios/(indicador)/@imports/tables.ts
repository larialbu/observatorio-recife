import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/ranking-municipios/indicador/RankingIndicador"
        )
    ),
  },
];

export default tables;
