import React, { useState, useEffect } from "react";
import ChartGrabber from "../../ChartGrabber";

interface IPCAData {
  Capital: string;
  Mês: string;
  "IPCA - Variação mensal(%)": string;
  "IPCA - Variação acumulado no ano(%)": string;
  "IPCA - Variação acumulada em 12 meses(%)": string;
}

interface IPCTableProps {
  data: IPCAData[];
  title: string;
  selectedMonth: string;
}

export const IPCTable: React.FC<IPCTableProps> = ({
  data,
  title,
  selectedMonth,
}) => {
  const [filteredData, setFilteredData] = useState<IPCAData[]>([]);
  const [sortedData, setSortedData] = useState<IPCAData[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const filtered = data
      .filter((item) => item.Mês === selectedMonth)
      .filter((item) =>
        item.Capital.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setFilteredData(filtered);
    setSortedData(filtered);
    setCurrentPage(1); // Reset para a primeira página em cada filtro
  }, [data, selectedMonth, searchQuery]);

  const handleSort = (
    key:
      | "IPCA - Variação acumulada em 12 meses(%)"
      | "IPCA - Variação acumulado no ano(%)"
  ) => {
    let direction: "asc" | "desc" = "desc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "desc"
    ) {
      direction = "asc";
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      const aValue = parseFloat(a[key]);
      const bValue = parseFloat(b[key]);

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  // Cálculo dos dados paginados
  const totalRows = sortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startRow, startRow + rowsPerPage);

  return (
    <div className="  ">
      <ChartGrabber>
        <h3 className="text-center mb-4 font-semibold">
          {title} - {selectedMonth}
        </h3>
        <input
          type="text"
          placeholder="Buscar por capital"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
        />
        <div className="max-h-[358px] overflow-y-auto border">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-200 font-semibold text-[11px] sm:text-sm md:text-base lg:text-lg">
                  Capital
                </th>
                <th
                  className="border border-gray-300 p-2 bg-gray-200 font-semibold cursor-pointer hover:bg-gray-300 text-[11px] sm:text-sm md:text-base lg:text-lg"
                  onClick={() =>
                    handleSort("IPCA - Variação acumulada em 12 meses(%)")
                  }
                >
                  IPCA 12 meses
                </th>
                <th
                  className="border border-gray-300 p-2 bg-gray-200 font-semibold cursor-pointer hover:bg-gray-300 text-[11px] sm:text-sm md:text-base lg:text-lg"
                  onClick={() =>
                    handleSort("IPCA - Variação acumulado no ano(%)")
                  }
                >
                  IPCA ano
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                    {item.Capital}
                  </td>
                  <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                    {item["IPCA - Variação acumulada em 12 meses(%)"]}
                  </td>
                  <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                    {item["IPCA - Variação acumulado no ano(%)"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controles de paginação */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Próxima
          </button>
        </div>
      </ChartGrabber>
    </div>
  );
};
