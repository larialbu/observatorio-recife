export const applyGenericFilters = (data: any[], filters: Record<string, any>, noData:boolean = false) => {
  console.log("Dados brutos:", data);
  console.log("Filtros aplicados:", filters);

  const yearFilter = filters.year || "2024";


  // 2) "filteredData": Filtra por ano + additionalFilters selecionados.
  //    Isso afeta só a exibição final, não as 'options'.
  const filteredData = data.filter((item) => {
  
    // Aqui, se 'filters.additionalFilters' tiver “Recife” selecionado em “AEROPORTO NOME”,
    // filtramos. Assim, o dataset final mostra só Recife, mas as options mostram todos.
    if (filters.additionalFilters) {
      for (const f of filters.additionalFilters) {
        if (!f.selected || f.selected.length === 0) continue;
        const val = item[f.label];
        if (f.fixed?.includes(val)) return true;
        if (!f.selected.includes(val)) {
          return false;
        }
      }
    }
    return true;
  });

  // 3) Montamos 'additionalFiltersOptions' a partir de 'data',
  //    ou seja, pega TODOS os aeroportos (outra label) do ano, sem restringir pela seleção
  const additionalFiltersOptions =
    filters.additionalFilters?.map((f: any) => {
      // Pegamos todos os valores (ex.: todos aeroportos) no data
      const uniqueValues = Array.from(
        new Set(data.map((item) => item[f.label]))
      )
        .filter((v) => v != null)
        // **Exclui as opções fixas**
        .filter((op: string) => !(f.fixed && f.fixed.includes(op)));

      return { ...f, options: uniqueValues };
    }) || [];

  console.log("filteredData (exibição final):", filteredData);
  console.log("data (para combos):", data);
  console.log("additionalFiltersOptions:", additionalFiltersOptions);

  // Retornamos o "filteredData" pra exibir no gráfico ou tabela,
  // mas as 'options' vêm de 'data'.
  return { filteredData, additionalFiltersOptions };
};
