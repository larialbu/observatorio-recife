"use client";
import React, { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";

const HiddenChartsPanel = () => {
  const { hiddenCharts, removeHiddenChart } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const category = pathname.split('/')[2] || 'default';

  const filteredCharts = hiddenCharts.filter(chart => chart.category === category);
  console.log(filteredCharts)

  const handleRestoreChart = (chart: any) => {
    if (chart.wrapperElement) {
      chart.wrapperElement.style.display = "flex";
    }

    removeHiddenChart(chart.id);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        {isOpen ? '✕' : '📊'}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl w-80 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Gráficos Escondidos</h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          
          {filteredCharts.length === 0 ? (
            <p className="p-4 text-gray-400">Nenhum gráfico escondido</p>
          ) : (
            <div className="divide-y">
              {filteredCharts.map((chart) => (
                <div
                  key={chart.id}
                  onClick={() => handleRestoreChart(chart)}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3"
                >
                  {chart.thumbnailUrl && (
                    <img 
                      src={chart.thumbnailUrl}
                      alt="Miniatura do gráfico"
                      className="w-16 h-12 object-cover rounded border"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{chart.title}</p>
                    {chart.subText && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {chart.subText}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HiddenChartsPanel;