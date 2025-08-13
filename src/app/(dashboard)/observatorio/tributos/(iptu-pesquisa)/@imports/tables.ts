import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/tributos/iptu-avaliacoes/IptuAvaliacoes"
        )
    ),
  },
];

export default tables;
