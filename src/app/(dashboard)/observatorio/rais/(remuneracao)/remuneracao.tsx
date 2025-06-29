import React, { useState, useEffect, useRef } from "react";

import SelectCompare from "@/components/@global/features/SelectCompare";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { raisCboDicts } from "@/utils/dicts/rais/raisCboDicts";
import { raisCodCboDicts } from "@/utils/dicts/rais/raisCodCboDicts";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";

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
  const [tempFiltredCBO, setTempFiltredCBO] = useState([]);

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);


  const cboOption = toCompare.map((opt: string) => `${raisCboDicts[opt]}`)

  return (
    <div>
      <div className="sm:grid sm:grid-cols-[60fr_40fr] gap-5">
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
          options={cboOption}
          // initialValue={['Recife']}
          noRecife={false}
          filters={tempFiltredCBO}
          setFilters={setTempFiltredCBO}
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
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full min-h-[800px]"
            >
                <Component
                  profissao={[...tempFiltred, ...tempFiltredCBO.map((cbo) => raisCodCboDicts[cbo])]}
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

export default Remuneracao;
