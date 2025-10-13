import React, { Component } from "react";

const tables = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/tables/pib/geral/PibInfos"
      )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
];

export default tables;
