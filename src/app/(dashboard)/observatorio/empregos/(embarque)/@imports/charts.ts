import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/PassageirosDomesticoNatureza"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/CargasEmbarqueDom"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/DecolagensDomesticoEmbarque"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/CargasInternacionalEmbarque"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/PassageirosIntEmbarque"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/DecolagensInternacionalEmbarque"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/PassageirosNaturezaEmbarque"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/CargasNaturezaEmbarque"
        )
    ),
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/DecolagensNaturezaEmbarque"
        )
    ),
  },
];
export default charts;
