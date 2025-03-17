import React, { Component } from "react";

const tables = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/tables/pib/geral/PibInfos"
      )
    )
  },
];

export default tables;
