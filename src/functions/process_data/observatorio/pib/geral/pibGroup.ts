import { ProcessedDataPib } from "@/@types/observatorio/@data/ProcessedDataPib";

  interface ResultadoRegiao {
    group: string;
    pib: number;
  }
  
  const getItemName = (type: string ) => {
    switch (type) {
        case "regiao":
          return "Nome da Grande Região"
        case "estado":
          return "Nome da Unidade da Federação"
        case "municipio":
          return "Município - UF"
        default:
          return "Nome da Grande Região" 
      }
  }

  export function processPibGroup(array: ProcessedDataPib[], type: 'regiao' | 'estado' | 'municipio', capita: boolean = false): ResultadoRegiao[] {
  
   const itemName = getItemName(type)
    
    const resultado: ResultadoRegiao[] = [];
  
    // Itera sobre o array e acumula os PIBs por Nome da Grande Região
    array.forEach(item => {
      const regiaoExistente = resultado.find(r => r.group === item[itemName]);
  
      if (regiaoExistente) {
        // Se a região já existir no resultado, soma o PIB
        regiaoExistente.pib += item[capita ? "Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)" : "Produto Interno Bruto,  a preços correntes (R$ 1.000)"];
      } else {
        // Se a região não existir, cria um novo objeto para a região
        resultado.push({
          group: item[itemName],
          pib: item[capita ? "Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)" : "Produto Interno Bruto,  a preços correntes (R$ 1.000)"]
        });
      }
    });
  
    // Ordena os resultados pela soma do PIB de forma decrescente
    return resultado.sort((a, b) => b.pib - a.pib);
  }
  