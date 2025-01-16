import React, { useEffect, useState } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";

const Analitico = ({
  year,
  toCompare,
  data,
  monthRecent,
}: {
  year: string;
  toCompare?: any;
  data: any[];
  monthRecent?: number
}) => {
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
        initialValue={['Recife - PE']}
       
      />

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-6">
          {tablesRender.map(({ Component, Secundary }, index) => {
            // Ensure selectCountry has an initial empty string value
            if (!selectCountries[index]) {
              selectCountries[index] = '';
            }

            return (
              <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                  <div style={{ backgroundColor: ColorPalette.default[index]}} className="shadow-md rounded-lg p-4 w-100 flex flex-col items-center">
                    <Component
                      municipio={[ ...tempFiltred][index]}
                      color={ColorPalette.default[index]}
                      data={data}
                      year={year}
                      selectCountry={(country: string) => updateSelectCountry(index, country)}
                      monthRecent={monthRecent}

                    />
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center">
                    <Secundary
                      municipio={[ ...tempFiltred][index]}
                      color={ColorPalette.default[index]}
                      data={data}
                      year={year}
                      country={selectCountries[index]}
                      monthRecent={monthRecent}

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
