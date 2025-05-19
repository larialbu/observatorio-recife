import React, { useEffect, useState } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { ProcessedData } from "@/@types/observatorio/@fetch/balanca-comercial/processedData";
import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

const Analitico = ({
  year,
  data,
  toCompare = getUniqueValues<BalancaHeaders, "Município">(data, "Município"),
  monthRecent,
}: {
  year: string;
  toCompare?: string[];
  data: BalancaHeaders[];
  monthRecent?: number;
}) => {
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState(tables);

  // Store selectCountry states for each index
  const [selectCountries, setSelectCountries] = useState<string[]>([]);

  useEffect(() => {
    const getNewTables = tempFiltred.map((val) => {
      // VOU ARRUMAR ESSE FIQUE TRANQUILO
      return {
        Component: React.lazy(
          () =>
            import(
              "@/components/@build/observatorio/tables/balanca-comercial/analitico/BalInfo"
            )
        ),
        Secundary: React.lazy(
          () =>
            import(
              "@/components/@build/observatorio/tables/balanca-comercial/analitico/GroupProdutos"
            )
        ),
      };
    });

    setTablesRender([...getNewTables]);
  }, [tempFiltred]);

  // Update selectCountry for a specific index
  const updateSelectCountry = (index: number, country: string) => {
    setSelectCountries((prev) => {
      const updated = [...prev];
      updated[index] = country; // Update the country for the specific index
      return updated;
    });
  };

  return (
    <div>
      <SelectPrincipal
        options={toCompare}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        initialValue={["Recife - PE"]}
        noRecife={false}
      />

      <div className="flex justify-between items-center gap-2 h-full">
        <div className="flex flex-col gap-6">
       
         <div className="flex items-center justify-between gap-2">
            <div className="flex-1 h-[1px] bg-gray-800 dark:bg-gray-200"></div>
            <p className="text-gray-800 dark:text-gray-200">Negociações</p>
            <div className="flex-1 h-[1px] bg-gray-800 dark:bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {tablesRender.map(({ Component }, index) => {
              if (!selectCountries[index]) {
                selectCountries[index] = "";
              }

              return (
                <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                    <div
                      style={{ backgroundColor: ColorPalette.default[index] }}
                      className="shadow-md rounded-lg w-100 flex flex-col items-center"
                    >
                      <Component
                        municipio={[...tempFiltred][index]}
                        color={ColorPalette.default[index]}
                        data={data}
                        year={year}
                        selectCountry={(country: string) =>
                          updateSelectCountry(index, country)
                        }
                        monthRecent={monthRecent}
                      />
                    </div>
                </React.Suspense>
              );
            })}
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 h-[1px] bg-gray-800 dark:bg-gray-200"></div>
            <p className="text-gray-800 dark:text-gray-200">Grupos de Produtos</p>
            <div className="flex-1 h-[1px] bg-gray-800 dark:bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {tablesRender.map(({ Secundary }, index) => {
              if (!selectCountries[index]) {
                selectCountries[index] = "";
              }

              return (
                <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                    <div className="bg-white shadow-md rounded-lg w-100 flex flex-col items-center">
                      <Secundary
                        municipio={[...tempFiltred][index]}
                        color={ColorPalette.default[index]}
                        data={data}
                        year={year}
                        country={selectCountries[index]}
                        monthRecent={monthRecent}
                      />
                    </div>
                </React.Suspense>
              );
            })}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Analitico;
