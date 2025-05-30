import React, { useState, useEffect, useRef } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import SelectCompare from "@/components/@global/features/SelectCompare";
import { raisCboDicts } from "@/utils/dicts/rais/raisCboDicts";
import { raisCodCboDicts } from "@/utils/dicts/rais/raisCodCboDicts";
import { microCagedCboDicts } from "@/utils/dicts/micro-caged/microCagedCboDicts";

// AEROPORTO NOME

const Salario = ({
  year,
  data,
  toCompare = getUniqueValues<any, "cbo2002ocupação">(
    data,
    "cbo2002ocupação"
  ),
  toCompareMuni = getUniqueValues<any, "município">(
    data,
    "município"
  ),
}: {
  year: string;
  toCompare?: any;
  toCompareMuni?: any
  data: any;
}) => {
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tempFiltredCBO, setTempFiltredCBO] = useState([]);

  const [selectCompare, setSelectCompare] = useState([])
  const [tablesRender, setTablesRender] = useState(tables);
  

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

  const cboOption = toCompare.map((opt: string) => `${microCagedCboDicts[opt]}`).filter((opt: string) => opt !== 'undefined')

  useEffect(() => {
    const getNewTables = selectCompare.map((val) => {
      return tables[0]
    });
    
    // setTablesRender([...tables, ...getNewTables]);
    setTablesRender([...getNewTables]);
  }, [selectCompare]);
  
  const dataFiltred = data.filter((obj: any) => obj['indtrabintermitente'] == 0 && obj['salário'] >= 1518 * 0.3 && obj['salário'] <= 1518 * 150)
  // const dataFiltred = data

  return (
    <div>
      <div className="">
        <SelectPrincipal
          options={toCompareMuni}
          initialValue={['Recife-PE']}
          noRecife={false}
          filters={selectCompare}
          setFilters={setSelectCompare}
          label="Compare Municípios"
          placeholder="Digite para buscar uma profissão"
          notFoundMessage="Nenhuma profissão encontrada"
        />
      </div>

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
        <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style={`charts-items-wrapper ${selectCompare.length > 1 ? "!md:grid-cols-2" : "!grid-cols-1"}`}>
          {tablesRender.map(({ Component }, index) => { 

            return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full min-h-[800px]"
            >
                <Component
                  profissao={[...tempFiltred, ...tempFiltredCBO.map((cbo) => microCagedCboDicts[cbo])]}
                  color={ColorPalette.default[index]}
                  data={dataFiltred.filter((obj: any) => obj['município'] === selectCompare[index])}
                  year={year}
                />
            </div>
          )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default Salario;
