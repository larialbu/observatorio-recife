import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/estadual/PrecoMedioPorEstado")), title: "Preço Médio por Estado" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/estadual/PrecoMaximoPorEstado")), title: "Preço Máximo por Estado" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/estadual/PrecoMinimoPorEstado")), title: "Preço Mínimo por Estado" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/estadual/EvolucaoPrecoEstado")), title: "Evolução do Preço por Estado", wide: true },
];

export default charts;
