import React, { useEffect, useState } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import FocusHidden from "@/components/@global/features/FocusHidden";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";

const Analitico = ({
  year,
  toCompare,
  data,
}: {
  year: string;
  toCompare?: any;
  data: any[];
}) => {
  const [pageCompare, setPageCompare] = useState(0);
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState(tables);

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

    setTablesRender([...tables, ...getNewTables]);
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
        label="Compare Municípios"
        placeholder="Digite para buscar um Município"
        notFoundMessage="Nenhum Município encontrado"
      />

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-6">
          {tablesRender.map(({ Component, Secundary }, index) => {
            // Ensure selectCountry has an initial empty string value
            if (!selectCountries[index]) {
              selectCountries[index] = '';
            }

            return (
              <React.Suspense fallback={<div>Loading...</div>} key={index}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Component */}
                  <div style={{ backgroundColor: ColorPalette.default[index]}} className="shadow-md rounded-lg p-4 w-100 flex flex-col items-center">
                    <Component
                      municipio={["Recife - PE", ...tempFiltred][index]}
                      color={ColorPalette.default[index]}
                      data={data}
                      year={year}
                      selectCountry={(country: string) => updateSelectCountry(index, country)}
                    />
                  </div>

                  {/* Secundary */}
                  <div className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center">
                    <Secundary
                      municipio={["Recife - PE", ...tempFiltred][index]}
                      color={ColorPalette.default[index]}
                      data={data}
                      year={year}
                      country={selectCountries[index]}
                    />
                  </div>
                </div>
              </React.Suspense>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analitico;
