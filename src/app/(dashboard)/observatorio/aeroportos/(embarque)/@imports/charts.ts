import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/PassageirosDomesticoNatureza"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/CargasEmbarqueDom"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/DecolagensDomesticoEmbarque"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/CargasInternacionalEmbarque"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/PassageirosIntEmbarque"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/DecolagensInternacionalEmbarque"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/PassageirosNaturezaEmbarque"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/CargasNaturezaEmbarque"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/aeroporto/embarque/DecolagensNaturezaEmbarque"
        )
    ),
    col: 'col-span-3 xl:col-span-4'
  },
];
export default charts;
