"use client";

import React, { useEffect, useRef, useState } from "react";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";

const getDataObj = (data: any[]) => {
  const geralInfos = geralAccFunction(data || [], ['salário', 'saldomovimentação', "tamestabjan", "graudeinstrução", "sexo", "seção", "raçacor", "tamestabjan", "horascontratuais", "idade"])
  const womanInfos = { saldoMulher: geralAccFunction(data.filter((item: any) => item["sexo"] === "Mulher") || [], ['saldomovimentação' ])}
  const manInfos = { saldoHomem: geralAccFunction(data.filter((item: any) => item["sexo"] === "Homem") || [], ['saldomovimentação' ])}

  return { ...geralInfos, ...womanInfos, ...manInfos }
}

const Saldo = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState({})
  
  console.log('FOI!')

  useEffect(() => {
    const dataAdmitidos = getDataObj(data.filter((obj: any) => obj['saldomovimentação'] === "Admitidos"))
    const dataDemitidos = getDataObj(data.filter((obj: any) => obj['saldomovimentação'] === "Demitidos"))

    for (const key1 in dataAdmitidos) {
      console.log('key1', dataAdmitidos[key1], Object.keys(dataAdmitidos[key1]).length)
      if (key1 === 'saldoHomem' || key1 === 'saldoMulher') {
        for (const key2 in dataAdmitidos[key1]) {
          console.log('key2', dataAdmitidos[key1][key2])
        }
      }
    }

    setChartData(dataAdmitidos)
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

export default Saldo;
