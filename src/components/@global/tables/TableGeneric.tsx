import { ArrowIcon } from "@/components/random_temp/Sidebar";
import React, { useState } from "react";

interface PaginatedTableProps {
  headers: string[];
  rows: React.ReactNode[][];
  rowsPerPage?: number;
  title: string;
  color: string;
  clickedColor?: string;
  onClick?: any;
  maxHeight?: number;
  withClick?: boolean;
  enablePagination?: boolean;
  searchIndexes?: number[]; // Agora um array de índices das colunas a serem filtradas
  simple?: boolean
  ordenations?: {index: number
    name: string
    ordenation: number}[]
  onOrdenationChange?: any
}

const TableGeneric: React.FC<PaginatedTableProps> = ({
  headers,
  rows,
  rowsPerPage,
  title,
  color,
  clickedColor = color,
  onClick,
  maxHeight = 450,
  withClick,
  enablePagination = true,
  searchIndexes = [], // Índices das colunas a serem filtradas
  ordenations = [],
  onOrdenationChange
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [clicked, setClicked] = useState(-1);
  const [itemsPerPage, setItemsPerPage] = useState(rowsPerPage || rows.length);
  const [searchTexts, setSearchTexts] = useState<string[]>(new Array(headers.length).fill("")); // Estado para cada filtro de coluna

  const totalRows = rows.length;

  // Filtra as linhas conforme os textos de pesquisa
  const filteredRows = rows.filter((row) => {
    return searchIndexes.every((index) => {
      const searchText = searchTexts[index].toLowerCase();
      return row[index]?.toString().toLowerCase().includes(searchText);
    });
  });

  const totalPages = rowsPerPage ? Math.ceil(filteredRows.length / itemsPerPage) : 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);
  const currentRows = filteredRows.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const changePage = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setItemsPerPage(Number(event.target.value));
  //   setCurrentPage(1); // Resetar para a primeira página
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSearchTexts = [...searchTexts];
    newSearchTexts[index] = event.target.value;
    setSearchTexts(newSearchTexts);
    setCurrentPage(1); // Resetar para a primeira página ao fazer uma nova pesquisa
  };

  return (
    <div className="bg-none">
      <div className={`overflow-hidden flex flex-col rounded-lg h-full`} style={{ backgroundColor: `${color}` }}>
        <div className="mb-4 flex-1">
        {title &&
          <h3 className={`flex-1 bg-[${color}] w-full rounded-t-lg text-lg font-semibold px-8 py-6 text-white`}>
            {title}
          </h3>}
          {/* Campos de Pesquisa para as colunas com filtros ativos */}
          {searchIndexes.length > 0 && (
            <div className="mb-4 px-8 grid grid-cols-2 gap-4">
              {searchIndexes.map((index) => (
                <div className="relative">
                  <svg
                    className="absolute left-2 top-[50%] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.9 14.32a8 8 0 111.414-1.414l3.356 3.356a1 1 0 01-1.414 1.414l-3.356-3.356zM8 14a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                  key={index}
                  type="text"
                  value={searchTexts[index]}
                  onChange={(e) => handleSearchChange(e, index)}
                  placeholder={` Pesquisar por ${headers[index]}`}
                  className="w-full p-2 rounded border border-gray-300 pl-8"
                />
                </div>
              ))}
            </div>
          )}

          <div style={{ height: `${maxHeight}px`, overflowY: 'auto', backgroundColor: '#FFFFFF'}}>
            <table className="w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                {headers.map((header, index) => {
                    const current = ordenations.find((item) => item.index === index);
                    return (
                      <th
                        key={header}
                        className="relative text-sm p-2 px-5 border-b border-gray-200 font-semibold text-gray-700 text-center"
                        onClick={() => {
                          if (!current) return;

                          const newOrdenation = {
                            ...current,
                            ordenation: current.ordenation === 0 ? 1 : current.ordenation === 1 ? -1 : 0
                          };

                          if (onOrdenationChange) {
                            onOrdenationChange((prev: (typeof newOrdenation)[]) => { return [...prev
                              .filter((item) => item.name != newOrdenation.name)
                              .map(item => ({ ...item, ordenation: 0})), newOrdenation]});
                          }
                        }}
                      >
                        {header} {current?.ordenation ? (
                          <div className={`absolute top-0 right-0 ${current.ordenation > 0 ? 'rotate-90' : 'rotate-[-90deg]'}`}>
                            <ArrowIcon />
                          </div>
                        ) : ''}
                      </th>
                  )})}
                </tr>
              </thead>

              <tbody className="bg-white">
                {currentRows.map((row, rowIndex) => (
                  <tr
                    onClick={() => setClicked(withClick && clicked !== rowIndex ? rowIndex : -1)}
                    key={rowIndex}
                    className={`${rowIndex === clicked ? `bg-[${clickedColor}] text-white` : 'bg-white hover:bg-gray-100'} text-center`}
                    style={{ backgroundColor: rowIndex === clicked ? clickedColor : '#FFFFFF'}}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="p-2 px-5 border-b border-gray-200 text-sm"
                        onClick={() => {
                          if (onClick && clicked !== rowIndex) {
                            onClick(row);
                          } else if (onClick && clicked === rowIndex) {
                            onClick([])
                          }
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {enablePagination && totalPages > 1 && rowsPerPage !== undefined && (
            <div className="flex justify-between items-center mt-4 px-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white rounded disabled:bg-gray-300"
              >
                Anterior
              </button>

              <span className="text-sm text-white">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white rounded disabled:text-gray-200 disabled:bg-gray-300"
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableGeneric;
