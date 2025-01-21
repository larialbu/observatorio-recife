"use client";

import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";

const Geral = ({
  data,
  year,
  months,
}: {
  data: any;
  year: string;
  months: number;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const sortableInstance = useRef<Sortable | null>(null);

  // Função que cria o Sortable
  const createSortable = () => {
    if (
      !sortableContainerRef.current ||
      sortableInstance.current // Já existe
    ) {
      return;
    }
    sortableInstance.current = Sortable.create(sortableContainerRef.current, {
      animation: 150,
      onEnd: (evt) => {
        if (evt.oldIndex == null || evt.newIndex == null) return;
        const newOrder = [...chartOrder];
        const [movedItem] = newOrder.splice(evt.oldIndex, 1);
        newOrder.splice(evt.newIndex, 0, movedItem);
        setChartOrder(newOrder);
      },
    });
  };

  // Função que destrói o Sortable
  const destroySortable = () => {
    if (sortableInstance.current) {
      sortableInstance.current.destroy();
      sortableInstance.current = null;
    }
  };

  // Verifica o tamanho da tela e (re)cria/destroi Sortable
  const handleCheckWidth = () => {
    if (typeof window === "undefined") return; // segurança no SSR
    if (window.innerWidth >= 768) {
      // Se >= 768px, criar se ainda não existe
      createSortable();
    } else {
      // Se < 768, destruir se existir
      destroySortable();
    }
  };

  useEffect(() => {
    // Executa ao montar
    handleCheckWidth();

    // Ouvinte de resize
    window.addEventListener("resize", handleCheckWidth);
    return () => {
      window.removeEventListener("resize", handleCheckWidth);
      // opcional: destroy ao desmontar
      destroySortable();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartOrder]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component data={data} year={year} color={ColorPalette.default[index]} />
          </React.Suspense>
        ))}
      </div>

      <div
        ref={sortableContainerRef}
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 place-items-center"
      >
        {chartOrder.map((index) => {
          const { Component } = charts[index];
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-full overflow-x-hidden flex flex-col items-center"
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={data} months={months} />
              </React.Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Geral;
