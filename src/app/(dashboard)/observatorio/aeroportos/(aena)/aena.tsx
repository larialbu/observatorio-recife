"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { aeroportoDataFilter } from "@/utils/filters/@data/aeroportoDataFilter";
import chartsCargas from "./@imports/carga/charts";
import chartsPassageiros from "./@imports/passageiro/charts";
import cardsPassageiros from "./@imports/passageiro/cards";
import cardsCargas from "./@imports/carga/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const AenaPage = ({ year, months }: {year: string, months: number}) => {
  const { filters, isLoading, data } = useDashboard();
  const [filteredPassageiros, setFilteredPassageiros] = useState([]);
  const [filteredCargas, setFilteredCargas] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // Filtra os dados com base nos filtros
      const passageirosFiltered: any = aeroportoDataFilter(data[0]?.data || [], filters);
      const cargasFiltered: any = aeroportoDataFilter(data[1]?.data || [], filters);

      setFilteredPassageiros(passageirosFiltered);
      setFilteredCargas(cargasFiltered);

      console.log("Dados filtrados - Passageiros:", passageirosFiltered);
      console.log("Dados filtrados - Cargas:", cargasFiltered);
    }
  }, [filters, data]);

  if (isLoading) return <LoadingScreen />;

  console.log('filtredPassageiros',filteredPassageiros)

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cardsPassageiros.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component
              data={filteredPassageiros}
              year={year}
              color={ColorPalette.default[index]}
            />
          </React.Suspense>
        ))}
        {cardsCargas.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component
              data={filteredCargas}
              year={year}
              color={ColorPalette.default[index]}
            />
          </React.Suspense>
        ))}
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {chartsCargas.map(({ Component }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              {/* Passando os dados filtrados */}
              <Component data={filteredCargas} months={months} />
            </React.Suspense>
          </div>
        ))}
        {chartsPassageiros.map(({ Component }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              {/* Passando os dados filtrados */}
              <Component data={filteredPassageiros} months={months} />
            </React.Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AenaPage;
