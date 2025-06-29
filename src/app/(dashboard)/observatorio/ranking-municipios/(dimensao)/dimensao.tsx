import React, { useState, useEffect } from "react";

import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";

// AEROPORTO NOME

const Dimensao = ({
  year,
  rawData,
}: {
  year: string;
  data: any[];
  rawData: any[];
}) => {
  const { data, isLoading } = useDashboard() as any;
  const [dimensaoData, setDimensaoData] = useState([]);

  useEffect(() => {
    if (data) {
      const dimensaoData = data.dimensao || {};

      setDimensaoData(dimensaoData.filteredData || []);
    }
  }, [data]);

  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          {tables.map(({ Component }, index) => (
            <div key={index} className="h-full">
              <React.Suspense fallback={<div>Carregando...</div>}>
                <Component
                  color={ColorPalette.default[1]}
                  data={rawData}
                  year={year}
                />
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
                  <Component data={dimensaoData} />
                </React.Suspense>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dimensao;
