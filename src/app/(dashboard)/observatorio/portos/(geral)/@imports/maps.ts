import React from "react";

const maps = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/maps/porto/geral/PortoLocalizacao"
      )
    ),
  },
];

export default maps;
