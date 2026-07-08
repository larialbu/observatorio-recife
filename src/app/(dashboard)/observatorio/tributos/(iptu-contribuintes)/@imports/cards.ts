import React from "react";

const cards = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/iptuContribuintes/TotalContribuintesCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/iptuContribuintes/TotalAnoAnteriorCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/tributos/iptuContribuintes/VariacaoCard")) },
];

export default cards;
