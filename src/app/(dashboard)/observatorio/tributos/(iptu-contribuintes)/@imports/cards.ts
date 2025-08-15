import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/iptu-contribuintes/IptuContribuintes'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/iptu-contribuintes/IptuContribuintesAnoAnterior'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/iptu-contribuintes/IptuContribuintesComparacao'
        ),
    ),
  },
]

export default cards
