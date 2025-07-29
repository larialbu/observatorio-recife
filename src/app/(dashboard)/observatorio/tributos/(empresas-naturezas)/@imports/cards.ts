import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-naturezas/EmpresasAtivasNaturezaMesRecente'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-naturezas/EmpresasAtivasNaturezaMesAnterior'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-naturezas/EmpresasVariacaoAtivasNaturezaRecente'
        ),
    ),
  },
]

export default cards
