import React, { useState, useEffect } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";


const Indicador = ({
  year,
  rawData,
}: {
  year: string;
  data: any[];
  rawData: any[];
}) => {
  const { data, isLoading } = useDashboard();
  const [indicadorData, setIndicadorData] = useState([]);

  useEffect(() => {
    if (data) {
      const indicadorData = data.indicador || {};

      setIndicadorData(indicadorData.filteredData || []);
    }
  }, [data]);


  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          {tables.map(({ Component }, index) => (
            <div key={index} className="h-full">
              <React.Suspense fallback={<div>Loading...</div>}>
                <Component
                  color={ColorPalette.default[4]}
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
                  <Component data={indicadorData} />
                </React.Suspense>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indicador;
