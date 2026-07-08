import React from "react";

const charts = [
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuValores/TabelaEvolucao")), title: "Evolução do Valor Total da Arrecadação do IPTU" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuValores/LinhaValorTotal")), title: "Valor Total do IPTU", wide: true },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuValores/PorUsoRosca")), title: "Valor Total Arrecadado do IPTU pelo Uso do Imóvel" },
  { Component: React.lazy(() => import("@/components/@build/observatorio/charts/tributos/iptuValores/PorBairro")), title: "Valor Total do IPTU por Bairro" },
];

export default charts;
