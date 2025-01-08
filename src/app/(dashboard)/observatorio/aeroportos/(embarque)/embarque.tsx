import React, { useState } from "react";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import charts from "./@imports/charts";

const Embarque = ({
  toCompare,
  monthRecent,
  data,
}: {
  toCompare: string[];
  monthRecent?: number;
  data: any;
}) => {
  const [type, setType] = useState(['Embarque']);

  return (
    <div>
      <div className="flex items-center justify-center mb-6"> 
          <div className="bg-[#D1D5DB] rounded-full font-medium items-center grid grid-cols-2 p-1 text-center">
             <button onClick={() => setType(['Embarque'])} className={`${type[0] === 'Embarque' && 'bg-white hover:bg-[#eeeeee]'} transition duration-500 rounded-full py-1 px-3 hover:bg-[#bdc2c9]`}>
              Embarque
             </button>
             <button onClick={() => setType(['Desembarque'])} className={`${type[0] === 'Desembarque' && 'bg-white hover:bg-[#eeeeee]'} transition duration-500 rounded-full py-1 px-3 hover:bg-[#bdc2c9]`}>
              Desembarque
             </button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
        {charts.map(({ Component }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-full overflow-x-hidden flex flex-col items-center"
          >
            <React.Suspense fallback={<GraphSkeleton />}>
              <Component
                toCompare={toCompare}
                data={data}
                monthRecent={monthRecent}
                type={type[0]}
              />
            </React.Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Embarque;
