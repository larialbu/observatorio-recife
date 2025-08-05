import React, { useState, useRef } from "react";

import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import tables from "./@imports/tables";

// AEROPORTO NOME

const ItbiPesquisa = ({
  year,
  data,
  toCompare = getUniqueValues<any, "logradouro">(
    data.tributos || [],
    "logradouro"
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

  return (
    <div>
        <SelectPrincipal
          options={toCompare}
          noRecife={false}
          filters={tempFiltred}
          setFilters={setTempFiltred}
          label="Buscar por Logradouro"
          placeholder="Digite para buscar uma Logradouro"
          notFoundMessage="Nenhuma Logradouro encontrada"
        />
 
      <div className="flex flex-col gap-6">
        <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper !grid-cols-1">
          {tableOrder.map((index) => { 
            const { Component } = tables[index];

            return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full min-h-[800px]"
            >
                <Component
                  color={ColorPalette.default[index]}
                  data={data}
                  year={year}
                />
            </div>
          )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default ItbiPesquisa;
