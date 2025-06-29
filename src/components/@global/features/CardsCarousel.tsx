import { useEffect, useRef, useState } from "react";

export const CardsCarousel = ({ absoluteDivRef, dataPassed, children, pageCompare, setPageCompare, textDefault }: { absoluteDivRef: any, dataPassed: any, children: any, pageCompare: any, setPageCompare: any, textDefault: string  }) => {
    const [height, setHeight] = useState<number | null>(null);

    const [animationClass, setAnimationClass] = useState("card-enter");

    useEffect(() => {
        if (!absoluteDivRef.current) return;
    
        // Cria um ResizeObserver para monitorar mudanças na altura
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.contentRect.height !== height) {
              setHeight(entry.contentRect.height);
            }
          }
        });
    
        observer.observe(absoluteDivRef.current);
    
        return () => observer.disconnect(); // Limpa o observer ao desmontar
      }, [absoluteDivRef, height, dataPassed]); 

      const handlePageChange = (direction: "prev" | "next") => {
        setAnimationClass("card-exit"); // Aplica a animação de saída
        setTimeout(() => {
          setPageCompare((prevPage: any) =>
            direction === "next"
              ? prevPage === dataPassed.length - 1
                ? 0
                : prevPage + 1
              : prevPage === 0
              ? dataPassed.length - 1
              : prevPage - 1
          );
          setAnimationClass("card-enter"); // Aplica a animação de entrada após a mudança
        }, 500); // Tempo suficiente para a animação de saída
      };
   
   return (<>
          <div className="flex justify-between items-center gap-2">
        {dataPassed.length >= 1 ? (
          <>
            <button
              className="border transition duration-500 hover:bg-slate-200 dark:hover:bg-[#0F253D] bg-white dark:bg-[#0C1A28] dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => handlePageChange("prev")}
            >
              <svg
                className={`h-4 w-4 text-gray-500 dark:text-gray-300 transition-transform duration-200 rotate-90`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8l4 4 4-4" />
              </svg>
            </button>

            <div className="w-[85%] flex flex-wrap gap-4 justify-center mb-2 relative overflow-hidden" style={{ height: height ? `${height}px` : "auto" }}>
              {children}
            </div>

            <button
              className="border transition duration-500 hover:bg-slate-200 dark:hover:bg-[#0F253D] bg-white dark:bg-[#0C1A28] dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => handlePageChange("next")}
            >
              <svg
                className={`h-4 w-4 text-gray-500 dark:text-gray-300 transition-transform duration-200 -rotate-90`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8l4 4 4-4" />
              </svg>
            </button>
          </>
        ) : (
          <p className="text-center w-full text-gray-700">
            {textDefault}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center mb-6 gap-2">
        {dataPassed.map((_: any, i: any) => {
          return (
            <button
              key={i}
              onClick={() => setPageCompare(i)}
              className={`transition duration-200 hover:bg-slate-200 h-4 w-4 ${
                pageCompare === i ? "bg-slate-500" : "bg-white"
              } rounded-full border`}
            ></button>
          );
        })}
      </div>

    </>)
}