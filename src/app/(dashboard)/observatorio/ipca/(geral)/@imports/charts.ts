import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/geral/IpcaPorMeses"
        )
    ),
    title: "Ipca Anual de Selecionados",
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/geral/IpcaBrasilPorMeses"
        )
    ),
    title: "Ipca Anual do Brasil",
  },
  {
    Component: React.lazy(
      () =>
        import("@/components/@build/observatorio/charts/ipca/geral/IpcaNoAno")
    ),
    title: "Ipca Anual do Brasil",
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/geral/IpcaBrasilNoAno"
        )
    ),
    title: "Ipca Anual do Brasil",
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/geral/Ipca12Meses"
        )
    ),
    title: "Ipca Anual do Brasil",
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ipca/geral/IpcaBrasil12Meses"
        )
    ),
    title: "Ipca Anual do Brasil",
  },
];

export default charts;
