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
  // const tempFiltred = ["Rio De Janeiro", "Salvador", "Confins"];
  const [tablesRender, setTablesRender] = useState(tables);


  useEffect(() => {
    const getNewTables = tempFiltred.map((val) => {
      return {
        Component: React.lazy(
          () =>
            import(
              "@/components/@build/observatorio/tables/balanca-comercial/analitico/BalInfo"
            )
        ),
      };
    });

    setTablesRender([...tables, ...getNewTables]);
  }, [tempFiltred]);

  return (
    <div>
      {/*  */}
      <SelectPrincipal
        options={toCompare}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        label="Compare Aeroportos"
        placeholder="Digite para buscar um aeroporto"
        notFoundMessage="Nenhum aeroporto encontrado"
      />

      <div className="flex justify-between items-center gap-2">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {tablesRender.map(({ Component }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
            >
              <React.Suspense fallback={<div>Loading...</div>}>
                <Component
                  municipio={["Recife - PE", ...tempFiltred][index]}
                  color={ColorPalette.default[index]}
                  data={data}
                  year={year}
                />
              </React.Suspense>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analitico;
