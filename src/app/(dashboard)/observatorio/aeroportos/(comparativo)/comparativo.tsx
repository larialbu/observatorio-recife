import React, { useState } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";

const Comparativo = ({ tempMuni, data }: { tempMuni?: any, data: any[]; }) =>  {
  // colocar a função de filtro aki
  const [searchTerm, setSearchTerm] = useState('')
  // 
  const [pageCompare, setPageCompare] = useState(0)
  const tempFiltred = ['RIO DE JANEIRO', 'SALVADOR', 'CONFINS']
  console.log('aaaaaaaaaa', tempFiltred)

  console.log(tempMuni)

// const processFilters(fetchedData, aeroportosFilters)

 return <div>
  {/*  */}
   <div className="mb-6 relative">
     <label
       htmlFor="municipio"
       className="block text-gray-700 font-semibold mb-2"
     >
      Compare Aeroportos
     </label>
     <input
       type="text"
       id="municipio"
       className="p-2 border rounded-lg w-full"
       placeholder="Digite para buscar um aeroporto"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
     />
     {searchTerm && (
       <ul className="absolute z-10 bg-white border rounded-lg w-full mt-1 max-h-48 overflow-y-auto">
         {tempMuni.map((municipio: string) => (
           <li
             key={municipio}
             className="p-2 hover:bg-blue-100 cursor-pointer"
             onClick={() => {
              //  setSelectedMunicipio(municipio);
               setSearchTerm(municipio); // Atualiza o campo de busca
              //  setFilteredMunicipios([]); // Limpa as sugestões
             }}
           >
             {municipio}
           </li>
         ))}
       </ul>
     )}
 </div>
  {/*  */}

  <div className="flex justify-between items-center gap-2">
    <button className="border transition duration-500 hover:bg-slate-200 bg-white rounded-full w-10 h-10 flex items-center justify-center" onClick={() => {
      if (pageCompare === 0) {
        setPageCompare(tempFiltred.length - 1)
      } else {
        setPageCompare(pageCompare - 1)
      }
      }}>
      <svg
        className={`h-4 w-4 text-gray-500 transition-transform duration-200 rotate-90`}
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

    <div className="w-[85%] flex flex-wrap gap-4 justify-center mb-2">
      {
         [tempFiltred[pageCompare]].map((toCompare: string) => {
          return cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component
              local={"Recife"}
              toCompare={toCompare}
              data={data}
              year="2023"
              color={ColorPalette.default[index]}
              date={[10, 12]}
            />
          </React.Suspense>
        ))
        })
      }
    </div>

    <button className="border transition duration-500 hover:bg-slate-200 bg-white rounded-full w-10 h-10 flex items-center justify-center" onClick={() => {
      if (pageCompare === tempFiltred.length - 1) {
        setPageCompare(0)
      } else {
        setPageCompare(pageCompare + 1)
      }
      }}>
      <svg
        className={`h-4 w-4 text-gray-500 transition-transform duration-200 -rotate-90`}
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
  </div>

  <div className="flex items-center justify-center mb-6 gap-2">
    {
      tempFiltred.map((_, i) => {
        console.log(i)
       return <button key={i} onClick={() => setPageCompare(i)} className={`transition duration-200 hover:bg-slate-200 h-4 w-4 ${pageCompare === i ? 'bg-slate-500' : 'bg-white'} rounded-full border`}></button>

      })
    }
  </div>
    
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {charts.map(({ Component }, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
        >
          <React.Suspense fallback={<div>Loading...</div>}>
            <Component data={data} />
          </React.Suspense>
        </div>
      ))}
    </div>
  </div>
}

export default Comparativo;
