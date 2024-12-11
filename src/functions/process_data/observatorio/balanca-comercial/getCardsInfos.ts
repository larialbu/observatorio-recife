import { ForeignTrade } from "@/@types/observatorio/balanca-comercial/foreignTrade";
import { ComercioExterior } from "../../../components/observatorio/balancaComercial/types/Comerce";

export function getCardsInfos(
  jsonData: ComercioExterior[],
  anoFiltro: string
): ForeignTrade {
  // Filtra os dados para incluir apenas os registros do ano especificado
  const dadosFiltrados = jsonData.filter((item) => item.Ano === anoFiltro);

  // Inicializa acumuladores para exportação e importação
  let totalExport = 0;
  let totalImport = 0;

  // Itera sobre os dados filtrados para acumular valores de exportação e importação
  dadosFiltrados.forEach((item) => {
    const valor = parseFloat(item["Valor US$"].replace(/,/g, "")) || 0;

    if (item.tipo === "Exportação") {
      totalExport += valor;
    } else if (item.tipo === "Importação") {
      totalImport += valor;
    }
  });

  // Calcula a diferença entre exportação e importação
  const diference = totalImport - totalExport;

  return {
    totalExport,
    totalImport,
    diference,
  };
}
