import React from "react";

const cards = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/itbiAvaliacoes/MaiorAvaliacaoCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/itbiAvaliacoes/MenorAvaliacaoCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/itbiAvaliacoes/TotalTransmissoesCard")) },
];

export default cards;
