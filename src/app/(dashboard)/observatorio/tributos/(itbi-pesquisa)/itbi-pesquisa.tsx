"use client";

import React from "react";

import ItbiPesquisaTable from "@/components/@build/observatorio/tables/tributos/itbi/ItbiPesquisaTable";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const ItbiPesquisa = ({ data }: { data: any }) => {
  return (
    <div className="pb-16">
      <React.Suspense fallback={<GraphSkeleton />}>
        <ErrorBoundary>
          <ItbiPesquisaTable data={data} color={ColorPalette.default[0]} />
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
};

export default ItbiPesquisa;
