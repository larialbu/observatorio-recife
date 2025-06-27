import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/empresas/empresas-ativas-recife/EmpresasAtivasMes"
        )
    ),
  },
];

export default tables;
