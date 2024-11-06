import React, { useState } from "react";
import { ResultSH4 } from "../types/ResultSH4";
import ChartGrabber from "../../ChartGrabber";

interface ResultTableProps {
  data: ResultSH4[];
  title: string;
  type: "import" | "export";
}

export const SHTable: React.FC<ResultTableProps> = ({ data, title, type }) => {
  const [sortedData, setSortedData] = useState<ResultSH4[]>(data);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSort = (key: "importSH4" | "exportSH4") => {
    let direction: "asc" | "desc" = "desc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "desc"
    ) {
      direction = "asc";
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = data.filter((item) =>
      item.codeSH4.toLowerCase().includes(query)
    );
    setSortedData(filteredData);
  };

  return (
    <div className=" ">
      <ChartGrabber>
        <h3 className="text-center mb-4 font-semibold">{title}</h3>

        <input
          type="text"
          placeholder="Buscar código SH4"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4 p-2 border border-gray-300 rounded w-full   focus:outline-none focus:border-blue-500"
        />
        <div className="max-h-[300px] overflow-y-auto border">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-200 font-semibold text-[11px] sm:text-sm md:text-base lg:text-lg">
                  Código SH4
                </th>
                <th className="border border-gray-300 p-2 bg-gray-200 font-semibold text-[11px] sm:text-sm md:text-base lg:text-lg">
                  Descrição SH4
                </th>
                {type === "import" && (
                  <th
                    className="border border-gray-300 p-2 bg-gray-200 font-semibold cursor-pointer hover:bg-gray-300 text-[11px] sm:text-sm md:text-base lg:text-lg"
                    onClick={() => handleSort("importSH4")}
                  >
                    Importação
                  </th>
                )}
                {type === "export" && (
                  <th
                    className="border border-gray-300 p-2 bg-gray-200 font-semibold cursor-pointer hover:bg-gray-300 text-[11px] sm:text-sm md:text-base lg:text-lg"
                    onClick={() => handleSort("exportSH4")}
                  >
                    Exportação
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                    {item.codeSH4}
                  </td>
                  <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                    {item.descSH4}
                  </td>
                  {type === "import" && (
                    <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                      {item.importSH4}
                    </td>
                  )}
                  {type === "export" && (
                    <td className="border border-gray-300 p-2 text-[11px] sm:text-sm md:text-base">
                      {item.exportSH4}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartGrabber>
    </div>
  );
};
