import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuContribuintes/LinhaContribuintes")), title: "Total de Contribuintes do IPTU", wide: true },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuContribuintes/TabelaVariacao")), title: "Variação da Quantidade de Contribuintes" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuContribuintes/PorUso")), title: "Quantidade de Contribuintes do IPTU pelo Uso do Imóvel" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuContribuintes/PorBairro")), title: "Total de Contribuintes do IPTU por Bairro" },
];

export default charts;
