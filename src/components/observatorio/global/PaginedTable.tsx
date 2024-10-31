// components/PaginatedTable.tsx

import { useState } from "react";

interface PaginatedTableProps {
  headers: string[];
  rows: string[][];
  rowsPerPage?: number;
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  headers,
  rows,
  rowsPerPage = 100,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // obter o ano a partir da linha
  const getYearFromRow = (row: string[]) => {
    const yearColumnIndex =
      headers.indexOf("ANO") !== -1
        ? headers.indexOf("ANO")
        : headers.indexOf("Ano") !== -1
        ? headers.indexOf("Ano")
        : headers.indexOf("ano") !== -1
        ? headers.indexOf("ano")
        : -1;
  
    return yearColumnIndex >= 0 ? row[yearColumnIndex] : "Desconhecido";
  };

  // organizar as linhas por ano
  const rowsByYear = rows.reduce((acc: { [year: string]: string[][] }, row) => {
    const year = getYearFromRow(row);
    if (!acc[year]) acc[year] = [];
    acc[year].push(row);
    return acc;
  }, {});

  // paginação por ano
  const paginatedRowsByYear = Object.keys(rowsByYear).reduce(
    (acc, year) => {
      const totalPages = Math.ceil(rowsByYear[year].length / rowsPerPage);
      const startRow = (currentPage - 1) * rowsPerPage;
      const endRow = startRow + rowsPerPage;
      acc[year] = {
        rows: rowsByYear[year].slice(startRow, endRow),
        totalPages,
      };
      return acc;
    },
    {} as { [year: string]: { rows: string[][]; totalPages: number } }
  );

  return (
    <div className="overflow-auto bg-white rounded-lg shadow-lg p-4">
      {Object.keys(paginatedRowsByYear).map((year) => (
        <div key={year} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Ano: {year}
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="p-2 border-b border-gray-200 font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRowsByYear[year].rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-2 border-b border-gray-200"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação para cada Ano */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {paginatedRowsByYear[year].totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, paginatedRowsByYear[year].totalPages))
              }
              disabled={currentPage === paginatedRowsByYear[year].totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Próxima
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
