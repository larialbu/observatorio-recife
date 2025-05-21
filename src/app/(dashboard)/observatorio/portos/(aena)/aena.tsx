import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import tables from "./@imports/tables";
import { PortoPassageirosOutputData } from "@/@types/observatorio/@data/portoData";

const defaultPassageiros: PortoPassageirosOutputData = {
  passageiros: {
    current: [],
    past: [],
  },
};


const AenaPage = () => {
  const { data, isLoading } = useDashboard();
  const [passageiros, setPassageiros] = useState(defaultPassageiros);

  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPassageirosData = () => {
      if (data && data.id === "porto-passageiros") {
        const passageirosData = {
          passageiros: { 
            current: data?.passageiros?.current.filteredData || [],
            past: data?.passageiros?.past.filteredData || []
          }
        };
        setPassageiros(passageirosData);
      }
    };

    fetchPassageirosData(); // Chama a função assíncrona
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        Movimentação Passageiros (Recife)
      </h2>

      {/* Cards de Passageiros e Cargas */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.slice(0, 1).map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <Component data={passageiros} cards={cards.slice(1)} year={""} color={ColorPalette.default} />
          </React.Suspense>
        ))}
      </div>

    {/* Gráficos de Passageiros e Cargas */}
    <SortableDiv 
        chartOrder={chartOrder} 
        setChartOrder={setChartOrder} 
        sortableContainerRef={sortableContainerRef} 
        style="charts-items-wrapper"
      >
        {chartOrder.map((index) => {
          const { Component, col } = charts[index];

          return (
            <div key={index} className={`chart-content-wrapper ${col === 'full' && 'col-span-full'}`}>
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={passageiros} months={12} />
              </React.Suspense>
            </div>
          );
        })}

        {/* se colocar o tablerOrder.map aki o nda pra trocar a tabela de lugar se n da erro  */}
      </SortableDiv>

      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper">
          {tableOrder.map((index) => {
          const { Component } = tables[index];
         
          return ( 
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full"
            >
              <React.Suspense fallback={<div>Carregando...</div>}>
                <Component
                  color={ColorPalette.default[index]}
                  data={passageiros}
                />
              </React.Suspense>
            </div>
          )})}
        </SortableDiv>
    </div>
  );
};

export default AenaPage;
