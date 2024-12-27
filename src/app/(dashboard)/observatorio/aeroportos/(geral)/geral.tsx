import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";

const Geral = ({ data, year }: { data: any; year: string }) => {
  const isMdScreen = useMediaQuery("(max-width: 999px)"); // Define o ponto de quebra para 'md'

  const chartPairs: {
    Component: React.LazyExoticComponent<React.FC<{ data: any }>>;
    title?: string;
  }[][] = charts.reduce((pairs, chart, i) => {
    if (i % 2 === 0) {
      pairs.push([chart]);
    } else {
      pairs[pairs.length - 1].push(chart);
    }
    return pairs;
  }, [] as {
    Component: React.LazyExoticComponent<React.FC<{ data: any }>>;
    title?: string;
  }[][]);

  const [splits, setSplits] = useState(chartPairs.map(() => 50));

  return (
    <div>
      {/* Cartões */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component
              local={"Recife"}
              data={data}
              year={year}
              color={ColorPalette.default[index]}
            />
          </React.Suspense>
        ))}
      </div>

      {/* Gráficos */}
      <div className="flex flex-col gap-6">
        {chartPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="relative h-[425px] w-full flex">
            {/* Exibe o primeiro gráfico */}
            <div
              className="bg-white shadow-md rounded-lg p-4 overflow-auto"
              style={{
                width: isMdScreen ? "100%" : `${splits[pairIndex]}%`,
                minWidth: "350px",
              }}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                {pair[0] && React.createElement(pair[0].Component, { data })}
              </React.Suspense>
            </div>

            {/* Exibe o divisor e o segundo gráfico apenas em telas maiores */}
            {!isMdScreen && pair.length > 1 && (
              <>
                {/* Divisor central para redimensionamento */}
                <div
                  className="w-6 cursor-col-resize hover:bg-gray-300 rounded transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startX = e.pageX;
                    const startSplit = splits[pairIndex];
                    const container = e.currentTarget.parentElement;

                    const onMouseMove = (moveEvent: MouseEvent) => {
                      if (container) {
                        const delta = moveEvent.pageX - startX;
                        const containerWidth = container.offsetWidth;
                        const percentageDelta = (delta / containerWidth) * 100;
                        const newSplit = Math.min(
                          Math.max(20, startSplit + percentageDelta),
                          80
                        );

                        const newSplits = [...splits];
                        newSplits[pairIndex] = newSplit;
                        setSplits(newSplits);
                      }
                    };

                    const onMouseUp = () => {
                      document.removeEventListener("mousemove", onMouseMove);
                      document.removeEventListener("mouseup", onMouseUp);
                    };

                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", onMouseUp);
                  }}
                />

                {/* Exibe o segundo gráfico */}
                <div
                  className="bg-white shadow-md rounded-lg p-4 overflow-auto"
                  style={{
                    width: `${100 - splits[pairIndex]}%`,
                    minWidth: "350px",
                  }}
                >
                  <React.Suspense fallback={<GraphSkeleton />}>
                    {pair[1] && React.createElement(pair[1].Component, { data })}
                  </React.Suspense>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Geral;
