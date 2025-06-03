import { AdditionalFilter, DataWithFilters, Filters } from "@/@types/observatorio/shared";

export function applyGenericFilters<T extends Record<string, any>>(
  data: T[],
  filters: Filters,
  skipLabel: string[] = [],
  skipOptions: string[] = [],
): DataWithFilters<T> {


  // 2) "filteredData": Filtra por ano + additionalFilters selecionados.
  //    Isso afeta só a exibição final, não as 'options'.
  const filteredData = data.filter((item) => {
  
    // Aqui, se 'filters.additionalFilters' tiver “Recife” selecionado em “AEROPORTO NOME”,
    // filtramos. Assim, o dataset final mostra só Recife, mas as options mostram todos.
    if (filters.additionalFilters) {
      for (const f of filters.additionalFilters as AdditionalFilter[]) {
        if (!f.selected || f.selected.length === 0 || skipLabel.includes(f.label)) continue;

        const val = item[f.label];
        const valStr = String(val);

        if (f.fixed?.includes(valStr as string)) return true;
        if (!f.selected.includes(valStr as string)) {
          return false;
        }
      }
    }
    return true;
  });

  // 3) Montamos 'additionalFiltersOptions' a partir de 'data',
  //    ou seja, pega TODOS os aeroportos (outra label) do ano, sem restringir pela seleção
  const additionalFiltersOptions: AdditionalFilter[] =
    filters.additionalFilters?.map((f) => {

      const uniqueValues = f.blocked ? f.options : Array.from(
        new Set(
          data
            .map((item) => (item)[f.label])
            .filter((v: string | number) => v !== null && v !== undefined)
        )
      )
        .map((v) => String(v))
        .filter((op) => !(f.fixed && f.fixed.includes(op)));;

      return { ...f, options: skipOptions.includes(f.label) ? [] : uniqueValues };
    }).filter((additionalFilter) => !additionalFilter.temp) || [];

  // Retornamos o "filteredData" pra exibir no gráfico ou tabela,
  // mas as 'options' vêm de 'data'.
  return { filteredData, additionalFiltersOptions };
};
