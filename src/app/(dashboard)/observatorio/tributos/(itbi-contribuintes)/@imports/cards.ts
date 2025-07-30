import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/tributos-itbi-contribuintes/ItbiMesRecente'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/tributos-itbi-contribuintes/ItbiMesAnterior'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/tributos-itbi-contribuintes/ItbiVariacaoInativasRecente'
        ),
    ),
  },
]

export default cards
