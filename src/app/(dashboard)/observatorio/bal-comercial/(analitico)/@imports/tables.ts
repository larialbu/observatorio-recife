import React from "react";

const tables = [
{
        Component: React.lazy(
          () =>
            import(
              "@/components/@build/observatorio/tables/balanca-comercial/analitico/BalInfo"
            )
        ),
        Secundary: React.lazy(
          () =>
            import(
              "@/components/@build/observatorio/tables/balanca-comercial/analitico/GroupProdutos"
            )
        ),
      }
];

export default tables;
