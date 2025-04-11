import React, { useState, useEffect, useRef } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { ProcessedData } from "@/@types/observatorio/aeroporto/processedData";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import SelectCompare from "@/components/@global/features/SelectCompare";

// AEROPORTO NOME

const Remuneracao = ({
  year,
  data,
  toCompare = getUniqueValues<any, "CBO Ocupação 2002">(
    data.ativ,
    "CBO Ocupação 2002"
  ),
}: {
  year: string;
  toCompare?: any;
  data: any;
}) => {
  const [tempFiltred, setTempFiltred] = useState([]);

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

// "CBO Ocupação 2002"
  console.log('TOCOM a-b-c', toCompare)


  return (
    <div>
      <div className="grid grid-cols-[60fr_40fr] gap-5">
        <SelectPrincipal
          options={toCompare}
          // initialValue={['Recife']}
          noRecife={false}
          filters={tempFiltred}
          setFilters={setTempFiltred}
          label="Buscar por Profissão"
          placeholder="Digite para buscar uma profissão"
          notFoundMessage="Nenhuma profissão encontrada"
        />

        <SelectPrincipal
          options={toCompare}
          // initialValue={['Recife']}
          noRecife={false}
          filters={tempFiltred}
          setFilters={setTempFiltred}
          label="Buscar por CBO"
          placeholder="Digite para buscar um CBO"
          notFoundMessage="Nenhum CBO encontrado"
        />
      </div>

      <div className="flex flex-col gap-6">
        <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper !grid-cols-1">
          {tableOrder.map((index) => { 
            const { Component } = tables[index];

            return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full"
            >
              <React.Suspense fallback={<div>Carregando...</div>}>
                <Component
                  profissao={[...tempFiltred]}
                  color={ColorPalette.default[index]}
                  data={data}
                  year={year}
                />
              </React.Suspense>
            </div>
          )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default Remuneracao;
