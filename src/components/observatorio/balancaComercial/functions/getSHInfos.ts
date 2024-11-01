import { ComercioExterior } from "../types/Comerce";
import { ResultSH4 } from "../types/ResultSH4";

export function getSHInfos(
  jsonData: ComercioExterior[],
  anoFiltro: string,
  municipioFiltro: string
): ResultSH4[] {
  // Filtrar dados pelo ano e município especificado
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item.Ano === anoFiltro &&
      item.Município.toLowerCase() === municipioFiltro.toLowerCase()
  );

  // Inicializar mapa para armazenar dados agregados por SH4
  const valoresPorSH4: Record<string, ResultSH4> = {};

  dadosFiltrados.forEach((item) => {
    const {
      "Codigo SH4": codeSH4,
      "Descrição SH4": descricaoSH4,
      tipo,
      "Valor US$": valorString,
    } = item;
    const valor = parseFloat(valorString.replace(/,/g, "")) || 0; // Converte o valor para número

    // Se não existe uma entrada para esse código SH4, inicializa o objeto
    if (!valoresPorSH4[codeSH4]) {
      valoresPorSH4[codeSH4] = {
        codeSH4: codeSH4,
        descSH4: descricaoSH4,
        importSH4: 0,
        exportSH4: 0,
      };
    }

    // Acumula os valores conforme o tipo de transação
    if (tipo === "Exportação") {
      valoresPorSH4[codeSH4].exportSH4 += valor;
    } else if (tipo === "Importação") {
      valoresPorSH4[codeSH4].importSH4 += valor;
    }
  });

  // Converte o objeto de valores por SH4 em um array de objetos
  return Object.values(valoresPorSH4);
}
