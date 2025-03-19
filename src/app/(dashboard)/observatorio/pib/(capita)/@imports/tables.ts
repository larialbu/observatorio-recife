import React, { Component } from "react";

const tables = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/tables/pib/capita/PibInfosCapita"
      )
    )
  },
];

export default tables;
