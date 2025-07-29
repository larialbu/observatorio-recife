import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-abertas-fechadas/EmpresasAtivasMesRecente'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-abertas-fechadas/EmpresasInativasMesRecente'
        ),
    ),
  },  
]

export default cards
