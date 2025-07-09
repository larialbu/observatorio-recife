import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-ativas-inativas/EmpresasAtivasMesRecente'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-ativas-inativas/EmpresasInativasMesRecente'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-ativas-inativas/EmpresasAtivasInativasMesRecente'
        ),
    ),
  },
  // {
  //   Component: React.lazy(
  //     () =>
  //       import(
  //         '@/components/@build/observatorio/cards/empresas/empresas-ativas/EmpresasAtivasMesRecente'
  //       ),
  //   ),
  // },
  // {
  //   Component: React.lazy(
  //     () =>
  //       import(
  //         '@/components/@build/observatorio/cards/empresas/empresas-ativas/EmpresasAtivasMesAnterior'
  //       ),
  //   ),
  // },
  // {
  //   Component: React.lazy(
  //     () =>
  //       import(
  //         '@/components/@build/observatorio/cards/empresas/empresas-ativas/EmpresasVariacaoAtivasRecente'
  //       ),
  //   ),
  // },  
]

export default cards
