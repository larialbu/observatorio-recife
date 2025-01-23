import React, { useEffect, useState } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { ProcessedIpcaTabelasData } from "@/@types/observatorio/ipca/processedIPCATabelasData";
import { useDashboard } from "@/context/DashboardContext";

const Analitico = ({
  year,
  monthRecent,
}: {
  year: string;
  toCompare?: any;
  monthRecent?: number;
}) => {
  const { data, isLoading } = useDashboard();
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState(tables);
  const [anaiticoData, setAnaliticoData] = useState([]);

  useEffect(() => {
    console.log("Dados recebidos:", data);

    if (data) {
      // Extraindo os dados de passageiros e cargas
      const analiticoData = data.tabelas || {};

      // setFilteredPassageiros(analiticoData.filteredData || []);
      setAnaliticoData(analiticoData.filteredData || []);

      console.log("Dados filtrados - Passageiros:", analiticoData.filteredData);
    }
  }, [data]);

  const toCompare = getUniqueValues<ProcessedIpcaTabelasData, "Capital">(
    anaiticoData,
    "Capital"
  );

  console.log("DATA IPCA TABELA", anaiticoData);
  console.log("TO COMPARE IPCA", toCompare);

  // Store selectCountry states for each index
  const [selectCountries, setSelectCountries] = useState<string[]>([]);

  useEffect(() => {
    const getNewTables = tempFiltred.map((val) => {
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
        initialValue={["Recife"]}
      />

      <div className="flex justify-between items-center gap-2 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {tablesRender.map(({ Component }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
            >
              <React.Suspense fallback={<div>Loading...</div>}>
                <div className="w-full">aaaa</div>
                {/* <Component
                  airport={["Recife", ...tempFiltred][index]}
                  color={ColorPalette.default[index]}
                  data={data}
                  year={year}
                /> */}
              </React.Suspense>
            </div>
          ))}
        </div>
        {/* <div className="flex flex-col gap-6">
          {tablesRender.map(({ Component, Secundary }, index) => {
            // Ensure selectCountry has an initial empty string value
            if (!selectCountries[index]) {
              selectCountries[index] = "";
            }

            return (
              <React.Suspense fallback={<div>Loading...</div>} key={index}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                  <div
                    style={{ backgroundColor: ColorPalette.default[index] }}
                    className="shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
                  >
                    <Component
                      municipio={[...tempFiltred][index]}
                      color={ColorPalette.default[index]}
                      data={anaiticoData}
                      year={year}
                      selectCountry={(country: string) =>
                        updateSelectCountry(index, country)
                      }
                      monthRecent={monthRecent}
                    />
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center">
                    <Secundary
                      municipio={[...tempFiltred][index]}
                      color={ColorPalette.default[index]}
                      data={anaiticoData}
                      year={year}
                      country={selectCountries[index]}
                      monthRecent={monthRecent}
                    />
                  </div>
                </div>
              </React.Suspense>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Analitico;
