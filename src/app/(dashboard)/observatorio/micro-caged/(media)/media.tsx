"use client";

import React, { useEffect, useRef, useState } from "react";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";
import { getSaldoData } from "@/functions/process_data/observatorio/micro-caged/getSaldoData";
import { getAvarageGroups } from "@/functions/process_data/observatorio/micro-caged/getAvarageGroups";

const getDataObj = (data: any[]) => {
  const geralInfos = geralAccFunction(data || [], ["tamestabjan", "graudeinstrução", "sexo", "seção", "raçacor", "horascontratuais", "idade", "cbo2002ocupação"])
  const womanInfos = { saldoMulher: geralAccFunction(data.filter((item: any) => item["sexo"] === "Mulher") || [], ['saldomovimentação' ])}
  const manInfos = { saldoHomem: geralAccFunction(data.filter((item: any) => item["sexo"] === "Homem") || [], ['saldomovimentação' ])}

  return { ...geralInfos, ...womanInfos, ...manInfos }
}

const Media = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState({})
  
  console.log('FOI! média')

  useEffect(() => {
    const dataObj = getDataObj(data)

    const keysObj = Object.keys(data[0]).filter(key => !['salário', 'competênciamov', 'ano', 'município', 'unidadesaláriocódigo', 'valorsaláriofixo'].includes(key))

    const dataSalario = data.reduce((acc, obj) => {

    keysObj.map((key) => {
      if (!acc[key]) {
        acc[key] = {}
      }

      if (!acc[key][obj[key]]) {
        acc[key][obj[key]] = 0
      }
      // console.log(acc[key], acc[key][obj[key]])

      acc[key][obj[key]] += obj['salário']
    })
      

      return acc
    }, {})

    console.log('Salário total ->',  dataSalario)

    console.log('DataObj', dataObj)

    getAvarageGroups(dataSalario, dataObj)

    // console.log('SalTotla', data.reduce((acc, obj) => acc += obj['salário'], 0), data.length, data.reduce((acc, obj) => acc += obj['salário'], 0) / data.length)

    setChartData(dataObj)
  }, [data])

  return (
    <div>
      {/* <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <ErrorBoundary>
              <Component
                data={chartData}
                year={year}
                color={ColorPalette.default[index]}
              />
            </ErrorBoundary>
          </React.Suspense>
        ))}
      </div> */}

      {/* <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
          const { Component } = charts[index];
          return (
            <div
              key={index}
              className={`chart-content-wrapper`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={chartData} />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv> */}
    </div>
  );
};

export default Media;
