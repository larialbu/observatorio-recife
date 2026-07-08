import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiContribuintes/LinhaTransmissoes")), title: "Quantidade de Transmissões Imobiliárias", span: 2 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiContribuintes/TabelaAnual")), title: "Total de Imóveis por Ano e Mês", span: 1 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiContribuintes/PorBairro")), title: "Quantidade de Transmissões por Bairro", span: 1 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiContribuintes/PorConstrucao")), title: "Quantidade de Transmissões por Tipo de Construção", span: 1 },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiContribuintes/PorUso")), title: "Quantidade de Transmissões pelo Uso do Imóvel", span: 1 },
];

export default charts;
