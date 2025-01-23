import React, { useState, useEffect } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { ProcessedData } from "@/@types/observatorio/aeroporto/processedData";

// AEROPORTO NOME

const Dimensao = ({
  year,
  data,
  months,
  rawData,
}: {
  year: string;
  data: any[];
  months: number;
  rawData: any[];
}) => {
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState(tables);
  console.log(data);

  useEffect(() => {
    const getNewTables = tempFiltred.map((val) => {
      return {
        Component: React.lazy(
          () =>
            import(
              "@/components/@build/observatorio/tables/aeroporto/comparativo/AeroportoInfo"
            )
        ),
      };
    });
    setTablesRender([...tables, ...getNewTables]);
  }, [tempFiltred]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          {tablesRender.map(({ Component }, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg h-full">
              <React.Suspense fallback={<div>Loading...</div>}>
                <Component
                  airport={["Recife", ...tempFiltred][index]}
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
                  <Component data={data} months={months} />
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
