import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/regional/PrecoMedioPorRegiao")), title: "Preço Médio por Região" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/regional/PrecoMaximoPorRegiao")), title: "Preço Máximo por Região" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/regional/PrecoMinimoPorRegiao")), title: "Preço Mínimo por Região" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/regional/EvolucaoPrecoRegiao")), title: "Evolução do Preço por Região", wide: true },
];

export default charts;
