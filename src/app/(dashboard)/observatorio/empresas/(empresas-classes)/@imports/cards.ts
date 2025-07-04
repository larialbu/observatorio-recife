import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-classes/EmpresasAtivasClassesMesRecente'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-classes/EmpresasAtivasClassesMesAnterior'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-classes/EmpresasVariacaoAtivasClassesRecente'
        ),
    ),
  },
]

export default cards
