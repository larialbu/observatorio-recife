"use client";

import React from "react";

import IptuPesquisaTable from "@/components/@build/observatorio/tables/tributos/iptu/IptuPesquisaTable";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const IptuPesquisa = ({ data }: { data: any }) => {
  return (
    <div className="pb-16">
      <React.Suspense fallback={<GraphSkeleton />}>
        <ErrorBoundary>
          <IptuPesquisaTable data={data} color={ColorPalette.default[0]} />
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
};

export default IptuPesquisa;
