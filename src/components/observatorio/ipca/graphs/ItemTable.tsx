import React, { useState, useEffect } from "react";

interface IndiceData {
  Capital: string;
  Data: string; // Exemplo: "janeiro/2023"
  Grupo: string;
  Indice: string;
  Item: string;
  SubItem: string;
  Subgrupo: string;
}

interface IndiceTableProps {
  data: IndiceData[];
  title: string;
  selectedMonth: string; // Filtro de mês e ano para exibir dados específicos
}

export const ItemTable: React.FC<IndiceTableProps> = ({
  data,
  title,
  selectedMonth,
}) => {
  const [filteredData, setFilteredData] = useState<IndiceData[]>([]);
  const [sortedData, setSortedData] = useState<IndiceData[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [itemQuery, setItemQuery] = useState<string>("");
  const [capitalQuery, setCapitalQuery] = useState<string>("");

  // Atualiza o filtro ao alterar o mês selecionado, a busca pelo item ou a capital
  useEffect(() => {
    const filtered = data
      .filter((item) => item.Data === selectedMonth)
      .filter((item) =>
        item.Item.toLowerCase().includes(itemQuery.toLowerCase())
      )
      .filter((item) =>
        item.Capital.toLowerCase().includes(capitalQuery.toLowerCase())
      );

    setFilteredData(filtered);
    setSortedData(filtered);
  }, [data, selectedMonth, itemQuery, capitalQuery]);

  const handleSort = (key: "Indice") => {
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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h3 className="text-center mb-4 font-semibold">
        {title} - {selectedMonth.split("/")[0]} {selectedMonth.split("/")[1]}
      </h3>

      <input
        type="text"
        placeholder="Buscar por capital"
        value={capitalQuery}
        onChange={(e) => setCapitalQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full sm:max-w-xs md:max-w-sm lg:max-w-md focus:outline-none focus:border-blue-500"
      />

      <input
        type="text"
        placeholder="Buscar por item"
        value={itemQuery}
        onChange={(e) => setItemQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full sm:max-w-xs md:max-w-sm lg:max-w-md focus:outline-none focus:border-blue-500"
      />

      <div className="max-h-[300px] overflow-y-auto border">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-200 font-semibold text-[11px] sm:text-sm md:text-base lg:text-lg">
                Capital
              </th>
              <th className="border border-gray-300 p-2 bg-gray-200 font-semibold text-[11px] sm:text-sm md:text-base lg:text-lg">
                Item
              </th>
              <th
                className="border border-gray-300 p-2 bg-gray-200 font-semibold cursor-pointer hover:bg-gray-300 text-[11px] sm:text-sm md:text-base lg:text-lg"
                onClick={() => handleSort("Indice")}
              >
                Índice
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                  {item.Capital}
                </td>
                <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                  {item.Item}
                </td>
                <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                  {item.Indice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
