export const applyGenericFilters = (data: any[], filters: Record<string, any>, skipLabel: string[] = [], noData:boolean = false) => {


  // 2) "filteredData": Filtra por ano + additionalFilters selecionados.
  //    Isso afeta só a exibição final, não as 'options'.
  const filteredData = data.filter((item) => {
  
    // Aqui, se 'filters.additionalFilters' tiver “Recife” selecionado em “AEROPORTO NOME”,
    // filtramos. Assim, o dataset final mostra só Recife, mas as options mostram todos.
    if (filters.additionalFilters) {
      for (const f of filters.additionalFilters) {
        if (!f.selected || f.selected.length === 0 || skipLabel.includes(f.label)) continue;
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
  console.log('Antes', filters.additionalFilters)
  const additionalFiltersOptions =
    filters.additionalFilters?.map((f: any) => {
      console.log('OPTSONT', f.options)
      // Pegamos todos os valores (ex.: todos aeroportos) no data
      const uniqueValues = Array.from(
        new Set(data.map((item) => item[f.label]))
      )
        .filter((v) => v != null)
        // **Exclui as opções fixas**
        .filter((op: string) => !(f.fixed && f.fixed.includes(op)));

      return { ...f, options: uniqueValues };
    }) || [];
    console.log('Depois', filters.additionalFilters, additionalFiltersOptions)

  // Retornamos o "filteredData" pra exibir no gráfico ou tabela,
  // mas as 'options' vêm de 'data'.
  return { filteredData, additionalFiltersOptions };
};
