import React from "react";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const Geral = ({ data, year }: { data: any; year: string }) => (
  <div>
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {cards.map(({ Component }, index) => (
        <React.Suspense fallback={<div>Loading...</div>} key={index}>
          <Component
            local={"Recife"}
            data={data}
            year={year} // Ajeitar isso aqui
            color={ColorPalette.default[index]}
          />
        </React.Suspense>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {charts.map(({ Component }, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
        >
          <React.Suspense fallback={<div>Loading...</div>}>
            <Component data={data} />
          </React.Suspense>
        </div>
      ))}
    </div>
  </div>
);

export default Geral;
