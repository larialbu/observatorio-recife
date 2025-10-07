import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/capag/geral/CapagMunicipios"
        )
    ),
    col: 'col-span-full'
  },
];

export default tables;
