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

  const handleRestoreChart = (chart: any) => {
    if (chart.wrapperElement) {
      chart.wrapperElement.style.display = "flex";
    }

    removeHiddenChart(chart.id);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-blue-500 text-white w-12 aspect-square rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        {isOpen ? '✕' : <svg width="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="#ffffff"/> </svg>}
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