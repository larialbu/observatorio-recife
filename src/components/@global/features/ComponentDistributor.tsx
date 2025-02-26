import React from "react";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";

// Definir tipos mais robustos para evitar erros
interface ComponentDistributorProps {
  chartOrder: number[];
  setChartOrder: React.Dispatch<React.SetStateAction<number[]>>;
  sortableContainerRef: React.RefObject<HTMLDivElement>;
  style: string;
  components: { Component: React.FC<any>; color: string }[]; 
  renderData: any; // Garantir que `renderData` seja sempre um objeto/array
}

const ComponentDistributor: React.FC<ComponentDistributorProps> = ({
  chartOrder,
  setChartOrder,
  sortableContainerRef,
  style,
  components,
  renderData,
}) => {
  // Verificar se renderData existe
  if (!renderData) {
    console.error("Erro: data não foi fornecida ou está indefinida");
    return <div>Erro: Dados não disponíveis</div>;
  }


  return (
    <SortableDiv
      chartOrder={chartOrder}
      setChartOrder={setChartOrder}
      sortableContainerRef={sortableContainerRef}
      style={style}
    >
      {chartOrder.map((index) => {
        const { Component, color } = components[index];
        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<GraphSkeleton />}>
              <Component data={renderData} color={color} />
            </React.Suspense>
          </div>
        );
      })}
    </SortableDiv>
  );
};

export default ComponentDistributor;
