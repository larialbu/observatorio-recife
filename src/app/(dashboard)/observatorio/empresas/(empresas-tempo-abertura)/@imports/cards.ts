import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-tempo-abertura/EmpresasTempoAberturaMedio'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-tempo-abertura/EmpresasTempoAberturaRegistro'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/empresas/empresas-tempo-abertura/EmpresasTempoAberturaViabilidade'
        ),
    ),
  },
]

export default cards
