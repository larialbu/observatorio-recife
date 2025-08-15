import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/iptu-valores/IptuContribuintes'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/iptu-valores/IptuContribuintesAnoAnterior'
        ),
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/tributos/iptu-valores/IptuContribuintesComparacao'
        ),
    ),
  },
]

export default cards
