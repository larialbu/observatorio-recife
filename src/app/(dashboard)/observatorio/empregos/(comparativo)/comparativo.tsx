import React, { useState, useEffect, useRef } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import SelectCompare from "@/components/@global/features/SelectCompare";
import { raisCboDicts } from "@/utils/dicts/rais/raisCboDicts";
import { raisCodCboDicts } from "@/utils/dicts/rais/raisCodCboDicts";

// AEROPORTO NOME

const Comparativo = ({
  year,
  data,
  toCompare = getUniqueValues<any, "Municipio">(
    data['caged'],
    "Municipio"
  ),
}: {
  year: string;
  toCompare?: any;
  data: any;
}) => {
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState(tables);

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getNewTables = tempFiltred.map((val) => {
      return tables[0]
    });

    // setTablesRender([...tables, ...getNewTables]);
    setTablesRender([...getNewTables]);
  }, [tempFiltred]);

  // const cboOption = toCompare.map((opt: string) => `${raisCboDicts[opt]}`)

  return (
    <div>
         <SelectPrincipal
          options={toCompare}
          initialValue={['Recife-PE']}
          noRecife={false}
          filters={tempFiltred}
          setFilters={setTempFiltred}
          label="Buscar por Município"
          placeholder="Digite para buscar um município"
          notFoundMessage="Nenhuma município encontrado"
        />



      <div className="flex flex-col gap-6">
        {/* <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper !grid-cols-1">
          {tableOrder.map((index) => { 
            const { Component } = tables[index];

            return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full min-h-[800px]"
            >
                <Component
                  municipio={[...tempFiltred]}
                  color={ColorPalette.default[index]}
                  data={data}
                  year={year}
                />
            </div>
          )})}
        </SortableDiv> */}

        <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper">
          {tablesRender.map(({ Component }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full "
            >
              <React.Suspense fallback={<div>Carregando...</div>}>
                <Component
                  municipio={[...tempFiltred][index]}
                  color={ColorPalette.default[index]}
                  data={data['caged'].filter((data: any) => data['Municipio'] === [...tempFiltred][index])}
                  year={year}
                />
              </React.Suspense>
            </div>
          ))}
        </SortableDiv>
      </div>
    </div>
  );
};

export default Comparativo;
