export const applyGenericFilters = (data: any[], filters: Record<string, any>) => {
    const filterKeyMap: Record<string, string> = {
      years: "ANO", // Mapeia 'years' para 'ANO'
    };
  
    console.log("Dados recebidos para filtragem:", data);
    console.log("Filtros aplicados:", filters);
  
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) {
          return true; // Ignora filtros vazios ou inválidos
        }
  
        const mappedKey = filterKeyMap[key] || key; // Usa o mapeamento ou a chave original
        console.log(`Chave: ${key}, Valor do filtro: ${filterValue}, Valor no item: ${item[mappedKey]}`);
  
        if (Array.isArray(filterValue)) {
          return filterValue.includes(item[mappedKey]);
        }
  
        if (typeof filterValue === "string" || typeof filterValue === "number") {
          return item[mappedKey] === filterValue;
        }
  
        return true; // Ignora filtros não aplicáveis
      });
    });
  };
  