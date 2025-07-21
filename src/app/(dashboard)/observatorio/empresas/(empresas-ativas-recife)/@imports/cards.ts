import React from "react";

const cards = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empresas/empresas-ativas-recife/EmpresasAtivasMesRecente"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empresas/empresas-ativas-recife/EmpresasVariacaoAtivasRecente"
      )
    ),
  },  
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/cards/empresas/empresas-ativas-recife/EmpresasAtivasMediaAno"
      )
    ),
  },    
];

export default cards;