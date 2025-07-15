import React from "react";

const maps = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/maps/empresas/empresas-ativas/EmpresasAbertasLocalizacao"
      )
    ),
  },
];

export default maps;
