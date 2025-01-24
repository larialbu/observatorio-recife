import React, { useState, useEffect } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";

// AEROPORTO NOME

const Dimensao = ({
  year,
  rawData,
}: {
  year: string;
  data: any[];
  months: number;
  rawData: any[];
}) => {
  const { data, isLoading } = useDashboard();
  const [dimensaoData, setDimensaoData] = useState([]);

  useEffect(() => {
    if (data) {
      const dimensaoData = data.dimensao || {};

      setDimensaoData(dimensaoData.filteredData || []);
    }
  }, [data]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          {tables.map(({ Component }, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg h-full">
              <React.Suspense fallback={<div>Loading...</div>}>
                <Component
                  color={ColorPalette.default[index]}
                  data={rawData}
                  year={year}
                />
              </React.Suspense>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {charts.map(({ Component }, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
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
