import React from "react";

const cards = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/iptuValores/TotalIptuCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/iptuValores/TotalAnoAnteriorCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/iptuValores/VariacaoCard")) },
];

export default cards;
