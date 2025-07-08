import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/comparativo-empresas-classes/EmpresasAtivasClassesMesRecente'
        ),
    ),
  },
  // {
  //   Component: React.lazy(
  //     () =>
  //       import(
  //         '@/components/@build/observatorio/cards/empresas/comparativo-empresas-classes/EmpresasAtivasClassesMesAnterior'
  //       ),
  //   ),
  // },
  // {
  //   Component: React.lazy(
  //     () =>
  //       import(
  //         '@/components/@build/observatorio/cards/empresas/comparativo-empresas-classes/EmpresasVariacaoAtivasClassesRecente'
  //       ),
  //   ),
  // },
]

export default cards
