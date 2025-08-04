import React from "react";

const charts = [
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-avaliacoes/ItbiValiacoesMediana"
      )
    ),
  },
  {
    Component: React.lazy(() =>
      import(
        "@/components/@build/observatorio/charts/tributos/itbi-avaliacoes/ItbiAvaliacoesBairroValor"
      )
    ),
  },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-ativas-recife/EmpresasAtivasMes"
  //     )
  //   ),
  // },
  // {
  //   Component: React.lazy(() =>
  //     import(
  //       "@/components/@build/observatorio/charts/empresas/empresas-ativas-recife/EmpresasVariacaoAtivasMes"
  //     )
  //   ),
  // },  
];

export default charts;