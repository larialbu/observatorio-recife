import React from "react";

export const recifeCards = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/comparativo/PrecoMedioRecifeCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/comparativo/TotalPostosCard")) },
];

export const municipioCards = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/comparativo/PrecoMedioMunicipioCard")) },
  { Component: React.lazy(() => import("@/components/@build/observatorio/cards/combustiveis/comparativo/TotalPostosMunicipioCard")) },
];
