import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/comparativo-empresas-classes/EmpresasAtivasClassesMesRecente'
        ),
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/comparativo-empresas-classes/EmpresasAtivasClassesMesAnterior'
        ),
    ),
    col: 'col-span-3'
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/comparativo-empresas-classes/EmpresasVariacaoAtivasClassesRecente'
        ),
    ),
    col: 'col-span-3'
  },
]

export default cards
