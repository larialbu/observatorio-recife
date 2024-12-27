import React, { useState, useEffect } from "react";

const GraphSkeleton = () => {
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    // Gerar alturas aleatórias para as barras após a montagem do componente
    const heights = [...Array(4)].map(() => Math.floor(Math.random() * 70 + 20));
    setBarHeights(heights);
  }, []);

  return (
    <div className="flex justify-center items-center h-[300px] w-[100%] rounded bg-blue-100 overflow-hidden">
      {/* Placeholder para o gráfico */}
      <div className="flex justify-center relative w-full h-full">
        {/* Placeholder para o título */}
        <div className="absolute flex justify-center w-full">
          <div className="mt-2 h-6 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
        </div>

        {/* Placeholder para o gráfico */}
        <div className="w-full h-full bg-gray-200 rounded-lg p-4 flex items-end justify-between space-x-4">
          {barHeights.length > 0 && barHeights.map((height, index) => (
            <div
              key={index}
              className="w-12 bg-gray-300 rounded-md animate-pulse"
              style={{ height: `${height}%` }} // Altura calculada após o componente ser montado
            ></div>
          ))}
        </div>

        {/* Placeholder para o eixo X */}
        <div className="absolute bottom-0 w-[93%] flex justify-between mt-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-2 w-12 bg-gray-300 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphSkeleton;
