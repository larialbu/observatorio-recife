import React, { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const AenaPage = () => {
  const { data, isLoading } = useDashboard();
  const [passageiros, setPassageiros] = useState({ passageiros: { current: [], past:  []}});

  useEffect(() => {
    const fetchPassageirosData = () => {
      if (data) {
        const passageirosData = { 
          passageiros: { 
            current: data?.passageiros?.current.filteredData || [],
            past: data?.passageiros?.past.filteredData || []
          }
        };
        setPassageiros(passageirosData);
      }
    };

    fetchPassageirosData(); // Chama a função assíncrona
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Movimentação Passagiros (Recife)
      </h2>

      {/* Cards de Passageiros e Cargas */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.slice(0, 1).map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component data={passageiros} cards={cards.slice(1)} ColorPalette={ColorPalette.default} />
          </React.Suspense>
        ))}
      </div>
    </div>
  );
};

export default AenaPage;
