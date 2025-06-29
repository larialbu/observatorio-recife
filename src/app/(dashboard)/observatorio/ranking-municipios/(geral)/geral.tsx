"use client";

import React, { useState } from "react";

import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import charts from "./@imports/charts";
import tables from "./@imports/tables";


const Geral = ({
  year,
  data,
  rawData,
}: {
  year: string;
  data: any[];
  rawData: any[];
}) => {
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState(tables);

  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          {tablesRender.map(({ Component }, index) => (
            <div
              key={index}
              className="h-full"
            >
              <React.Suspense fallback={<div>Carregando...</div>}>
                <ErrorBoundary>
                  <Component
                    airport={["Recife", ...tempFiltred][index]}
                    color={ColorPalette.default[index]}
                    data={rawData}
                    year={year}
                  />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 h-full">
            {charts.map(({ Component }, index) => (
              <div
                key={index}
                className="chart-content-wrapper"
              >
                <React.Suspense fallback={<GraphSkeleton />}>
                  <Component data={data} />
                </React.Suspense>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geral;
