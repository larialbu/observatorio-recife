import React from "react";

const charts = [
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ranking-municipios/dimensao/RankingCompetitividadeDimensaoMunicipios"
        )
    ),
    title: "",
  },
  {
    Component: React.lazy(
      () =>
        import(
          "@/components/@build/observatorio/charts/ranking-municipios/dimensao/VariacaoCompetividadeDimensaoMunicipios"
        )
    ),
    title: "",
  },
];

export default charts;
