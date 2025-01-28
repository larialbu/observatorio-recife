import { ReactNode, useEffect, useRef } from "react";
import Sortable from "sortablejs";

interface SortableDivProps {
  children: ReactNode;
  style?: string;
  sortableContainerRef: any
  chartOrder: any
  setChartOrder: any
}

export const SortableDiv = ({ chartOrder, setChartOrder, sortableContainerRef, children, style = "" }: SortableDivProps) => {
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

      return <div ref={sortableContainerRef} className={`${style}`}>{children}</div>
}