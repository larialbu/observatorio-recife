export const applyGenericFilters = (data: any[], filters: Record<string, any>) => {
  console.log("Dados brutos:", data);
  console.log("Filtros aplicados:", filters);

  const yearFilter = filters.year || "2024";

  // 1) "datasetParaOptions": Filtramos SÓ por ano (opcional).
  //    Assim as 'options' terão todos os aeroportos do ano selecionado,
  //    independente de ter marcado "Recife" ou não.
  const datasetParaOptions = data.filter((item) => {
    // Se você quiser ignorar até o ano, remova esse if
    if (item["ANO"] !== yearFilter && item["Ano"] !== yearFilter) {
      return false;
    }
    return true;
  });

  // 2) "filteredData": Filtra por ano + additionalFilters selecionados.
  //    Isso afeta só a exibição final, não as 'options'.
  const filteredData = data.filter((item) => {
    // Filtra por ano
    if (item["ANO"] !== yearFilter && item["Ano"] !== yearFilter) {
      return false;
    }

    // Aqui, se 'filters.additionalFilters' tiver “Recife” selecionado em “AEROPORTO NOME”,
    // filtramos. Assim, o dataset final mostra só Recife, mas as options mostram todos.
    if (filters.additionalFilters) {
      for (const f of filters.additionalFilters) {
        if (!f.selected || f.selected.length === 0) continue;
        const val = item[f.label];
        if (!f.selected.includes(val)) {
          return false;
        }
      }
    }
    return true;
  });

  // 3) Montamos 'additionalFiltersOptions' a partir de 'datasetParaOptions',
  //    ou seja, pega TODOS os aeroportos (outra label) do ano, sem restringir pela seleção
  const additionalFiltersOptions =
    filters.additionalFilters?.map((f: any) => {
      // Pegamos todos os valores (ex.: todos aeroportos) no datasetParaOptions
      const uniqueValues = Array.from(
        new Set(datasetParaOptions.map((item) => item[f.label]))
      ).filter((v) => v != null);

      return { ...f, options: uniqueValues };
    }) || [];

  console.log("filteredData (exibição final):", filteredData);
  console.log("datasetParaOptions (para combos):", datasetParaOptions);
  console.log("additionalFiltersOptions:", additionalFiltersOptions);

  // Retornamos o "filteredData" pra exibir no gráfico ou tabela,
  // mas as 'options' vêm de 'datasetParaOptions'.
  return { filteredData, additionalFiltersOptions };
};
