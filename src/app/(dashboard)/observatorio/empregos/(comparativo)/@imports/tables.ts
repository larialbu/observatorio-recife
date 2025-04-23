import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/empregos/comparativo/MovimentacaoEmpregos"
        )
    ),
  },
];

export default tables;
