import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/capag/geral/CapagMunicipios"
        )
    ),
    col: 'full'
  },
];

export default tables;
