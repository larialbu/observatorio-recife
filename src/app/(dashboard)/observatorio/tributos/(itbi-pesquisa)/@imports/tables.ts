import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/tributos/itbi-avaliacoes/ItbiAvaliacoes"
        )
    ),
  },
];

export default tables;
