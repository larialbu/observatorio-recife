import React from "react";

const cards = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/itbiContribuintes/TotalTransmissoesCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/itbiContribuintes/TotalAnoAnteriorCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/itbiContribuintes/VariacaoCard")) },
];

export default cards;
