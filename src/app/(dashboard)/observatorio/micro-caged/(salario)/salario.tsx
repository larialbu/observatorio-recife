import React, { useState, useEffect, useRef } from "react";

import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { getSmFiltred } from "@/functions/process_data/observatorio/micro-caged/getSmFiltred";
import { microCagedCboDicts } from "@/utils/dicts/micro-caged/microCagedCboDicts";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import charts from "./@imports/charts";
import tables from "./@imports/tables";

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
  const [chartsRender, setChartsRender] = useState(charts);

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [chartData, setChartData] = useState<any[]>([])

  // REF do container e REF da instância do Sortable
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

  const cboOption = toCompare.map((opt: string) => `${microCagedCboDicts[opt]}`).filter((opt: string) => opt !== 'undefined')

  useEffect(() => {
    const getNewTables = selectCompare.map((val) => {
      return tables[0]
    });
    const getNewCharts = selectCompare.map((val) => {
      return charts[0]
    });
    
    setTablesRender([...getNewTables]);
    setChartsRender([...getNewCharts]);
  }, [selectCompare]);
  
  useEffect(() => {
    // primeiro vou passar um loop no campo de salário minio para pegar os valores dos salários minimos no ano, e vou selecioanr o menor valor e subistituir pelo 1518
    // const dataFiltred = data.filter((obj: any) => obj['indtrabintermitente'] == 0 && obj['salário'] >= 1518 * 0.3 && obj['salário'] <= 1518 * 150)
    const dataFiltred = getSmFiltred(data)

    setChartData(dataFiltred)
  }, [data])

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
          noRecife={false}
          filters={tempFiltred}
          setFilters={setTempFiltred}
          label="Buscar por Profissão"
          placeholder="Digite para buscar uma profissão"
          notFoundMessage="Nenhuma profissão encontrada"
        />

        <SelectPrincipal
          options={cboOption}
          noRecife={false}
          filters={tempFiltredCBO}
          setFilters={setTempFiltredCBO}
          label="Buscar por CBO"
          placeholder="Digite para buscar um CBO"
          notFoundMessage="Nenhum CBO encontrado"
        />
      </div>

      <div className="flex flex-col gap-6">
        <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style={`charts-items-wrapper ${selectCompare.length > 1 ? "md:!grid-cols-2 " : "!grid-cols-1"}`}>
          {tablesRender.map(({ Component }, index) => { 

            return (
              <div key={index} className="w-full">
                <p className="font-semibold text-2xl text-gray-700 mb-2">
                  {selectCompare[index]}
                </p>
                <div
                  className="bg-white shadow-md rounded-lg flex flex-col items-center w-full min-h-[800px]"
                >
          
                    <Component
                      profissao={[...tempFiltred, ...tempFiltredCBO.map((cbo) => microCagedCboDicts[cbo])]}
                      color={ColorPalette.default[index]}
                      data={chartData.filter((obj: any) => obj['município'] === selectCompare[index])}
                      year={year}
                    />
                </div> 
              </div>
 
          )})}
        </SortableDiv>
      </div>

      <div className="flex flex-col gap-6">
        <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerTableRef} style={`charts-items-wrapper ${selectCompare.length > 1 ? "md:!grid-cols-2 " : "!grid-cols-1"}`}>
          {chartsRender.map(({ Component }, index) => { 

            return (
              <div  key={index} className="w-full">
                <p className="font-semibold text-2xl text-gray-700 mb-2">
                  {selectCompare[index]}
                </p>
                <div
                  className="chart-content-wrapper"
                >
          
                    <Component
                      profissao={[...tempFiltred, ...tempFiltredCBO.map((cbo) => microCagedCboDicts[cbo])]}
                      color={ColorPalette.default[index]}
                      data={chartData.filter((obj: any) => obj['município'] === selectCompare[index])}
                      year={year}
                    />
                </div> 
              </div>
 
          )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default Salario;
