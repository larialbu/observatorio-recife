import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/empregos/comparativo/MovimentacaoEmpregos"
        )
    ),
    col: 'col-span-3'
  },
];

export default tables;
