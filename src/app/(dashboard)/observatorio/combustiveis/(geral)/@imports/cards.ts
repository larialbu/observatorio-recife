import React from "react";

const cards = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/geral/PrecoMedioCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/geral/MesAnteriorCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/geral/VariacaoCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/geral/PrecoMinimoCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/geral/PrecoMaximoCard")) },
];

export default cards;
