import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/geral/PrecoMedioRevendaAno")), title: "Preço Médio de Revenda por Ano", span: 2 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/geral/DispersaoPrecoPostos")), title: "Preço Médio × Qtd. de Postos", span: 1 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/geral/PrecoMedioCapitais")), title: "Preço Médio nas Capitais", span: 1 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/geral/PrecoMedioPorEstado")), title: "Preço Médio por Estado", span: 1 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/combustiveis/geral/TreemapPrecoRegiao")), title: "Preço Médio por Região", span: 1 },
];

export default charts;
