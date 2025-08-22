import React from 'react'

const cards = [
  {
    Component: React.lazy(
      () =>
        import(
          '@/components/@build/observatorio/cards/capag/geral/CapagMunicipioNota'
        ),
    ),
  },
]

export default cards
