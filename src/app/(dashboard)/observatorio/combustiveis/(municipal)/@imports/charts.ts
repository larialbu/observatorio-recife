import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/municipal/PrecoMedioPorMunicipio")), title: "Preço Médio por Município" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/municipal/PrecoMaximoPorMunicipio")), title: "Preço Máximo por Município" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/municipal/PrecoMinimoPorMunicipio")), title: "Preço Mínimo por Município" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/municipal/EvolucaoPrecoMunicipio")), title: "Evolução do Preço por Município", wide: true },
];

export default charts;
