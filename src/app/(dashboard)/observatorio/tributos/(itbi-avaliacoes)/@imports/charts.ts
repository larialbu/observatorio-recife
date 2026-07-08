import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiAvaliacoes/MedianaAvaliacoes")), title: "Mediana das Avaliações dos Imóveis", wide: true },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiAvaliacoes/TabelaTransacoes")), title: "Transações Imobiliárias" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/itbiAvaliacoes/MedianaPorBairro")), title: "Mediana do Valor de Transmissão por Bairro" },
];

export default charts;
