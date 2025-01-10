"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { aeroportoDataFilter } from "@/utils/filters/@data/aeroportoDataFilter";
import charts from "./@imports/carga/charts";

const AenaPage = () => {
  const { filters, isLoading, data } = useDashboard();
  console.log('oi', data[0]?.data)
  const filteredPassageiros = aeroportoDataFilter(data[0]?.data || [], filters);
  const filteredCargas = aeroportoDataFilter(data[1]?.data || [], filters);

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map(({ Component }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              {/* Passando os dados filtrados */}
              <Component passageirosData={filteredPassageiros} cargasData={filteredCargas} />
            </React.Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AenaPage;