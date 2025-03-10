import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/porto/geral/PortoOperacoesTable"
        )
    ),
  },
];

export default tables;
