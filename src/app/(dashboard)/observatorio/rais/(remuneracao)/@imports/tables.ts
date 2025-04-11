import React from "react";

const tables = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/tables/rais/remuneracao/RemuneracaoProfissao"
        )
    ),
  },
];

export default tables;
